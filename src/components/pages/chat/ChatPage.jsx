import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UsersList from './ui/UsersList';
import ChatComponent from './ui/ChatComponent';
import {
  ADD_MESSAGE,
  SET_USERS,
  NEW_MESSAGE,
  STARTED_TYPING,
  STOPPED_TYPING,
  SET_CURRENT_WRITER,
} from './chatActions';

export default function ChatPage({ messages: initMessages, user: loggedUser }) {
  const [messages, setMessages] = useState(initMessages);
  const [users, setUsers] = useState([]);
  const [currentWriter, setCurrentWriter] = useState(null);
  const socketRef = useRef(null);

  const submitHandler = (input) => {
    const socket = socketRef.current;
    socket.send(JSON.stringify({ type: NEW_MESSAGE, payload: input }));
  };

  const currentWriterHandler = (isTyping) => {
    const socket = socketRef.current;
    if (isTyping) socket.send(JSON.stringify({ type: STARTED_TYPING }));
    else socket.send(JSON.stringify({ type: STOPPED_TYPING }));
  };

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://localhost:3000`);

    const socket = socketRef.current;

    socket.onopen = () => {
      // socket.send(JSON.stringify({ type: 'init' }));
      console.log('opened');
    };

    socket.onclose = () => {
      socket.send(JSON.stringify({ type: 'close' }));
    };

    socket.onerror = (err) => {
      console.log(err);
    };

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      switch (type) {
        case SET_USERS:
          setUsers(payload);
          break;
        case ADD_MESSAGE:
          setMessages((prev) => [...prev, payload]);
          break;
        case SET_CURRENT_WRITER:
          setCurrentWriter(payload);
          break;

        default:
          break;
      }
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <UsersList users={users} />
        </Col>
        <Col xs={10}>
          <ChatComponent
            submitHandler={submitHandler}
            messages={messages}
            loggedUser={loggedUser}
            currentWriter={currentWriter}
            currentWriterHandler={currentWriterHandler}
          />
        </Col>
      </Row>
    </Container>
  );
}
