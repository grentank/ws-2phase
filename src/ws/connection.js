import { Message } from '../../db/models';

const map = new Map();

const connectionCb = (socket, request) => {
  const userId = request.session.user.id;

  map.set(userId, { ws: socket, user: request.session.user });
  socket.on('error', console.error);

  socket.on('open', () => {
    map.forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: 'SET_USERS',
          payload: [...map.values()].map(({ user }) => user),
        }),
      );
    });
  });

  socket.on('message', async (message) => {
    const fromFront = JSON.parse(message);
    switch (fromFront.type) {
      case 'message':
        // Message.create(fromFront.payload).then((newMessage) => {
        map.forEach(({ ws, user }) => {
          ws.send(
            JSON.stringify({
              type: 'SET_MESSAGES',
              payload: { message: fromFront.payload },
            }),
          );
        });
        // });
        break;

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
          type: 'SET_USERS',
          payload: [...map.values()].map(({ user }) => user),
        }),
      );
    });
  });
};

export default connectionCb;
