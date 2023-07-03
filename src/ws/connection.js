import { Message, User } from '../../db/models';
import {
  NEW_MESSAGE,
  ADD_MESSAGE,
  STARTED_TYPING,
  SET_CURRENT_WRITER,
  STOPPED_TYPING,
  SET_USERS,
} from './serverActions';

const map = new Map(); // хранит все текущие соединения по WS

const connectionCb = (socket, request) => {
  const userId = request.session.user.id;

  map.set(userId, { ws: socket, user: request.session.user });
  // console.log(map);
  socket.on('error', console.error);

  map.forEach(({ ws }) => {
    ws.send(
      JSON.stringify({
        type: SET_USERS,
        payload: [...map.values()].map(({ user }) => user),
      }),
    );
  });

  socket.on('message', async (message) => {
    const { type, payload } = JSON.parse(message); // получили сообщение с клиента
    switch (type) {
      case NEW_MESSAGE: {
        Message.create({ text: payload, authorId: userId }).then(async (newMessage) => {
          const messageWithAuthor = await Message.findOne({
            where: { id: newMessage.id },
            include: User,
          });
          // console.log('new message', messageWithAuthor);
          map.forEach(({ ws, user }) => {
            ws.send(
              JSON.stringify({
                type: ADD_MESSAGE,
                payload: messageWithAuthor,
              }),
            );
          });
        });
        break;
      }
      case STARTED_TYPING: {
        map.forEach(({ ws, user }) => {
          ws.send(
            JSON.stringify({
              type: SET_CURRENT_WRITER,
              payload: request.session.user,
            }),
          );
        });
        break;
      }
      case STOPPED_TYPING: {
        map.forEach(({ ws, user }) => {
          ws.send(
            JSON.stringify({
              type: SET_CURRENT_WRITER,
              payload: null,
            }),
          );
        });
        break;
      }

      default:
        break;
    }
    console.log(`Received message ${message} from user ${userId}`);
  });

  socket.on('close', () => {
    map.delete(userId);
    map.forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: SET_USERS,
          payload: [...map.values()].map(({ user }) => user),
        }),
      );
    });
  });
};

export default connectionCb;
