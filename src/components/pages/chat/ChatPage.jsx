import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UsersList from './ui/UsersList';
import ChatComponent from './ui/ChatComponent';

const initUsers = [{ name: 'Alex' }, { name: 'Bob' }, { name: 'Carl' }];

export default function ChatPage({ messages: initMessages, user: loggedUser }) {
  const [messages, setMessages] = useState(initMessages);
  const [users, setUsers] = useState(initUsers);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:3000');

    socket.current.onopen = () => {
      socket.send(JSON.stringify({ type: 'INIT' }));
    };

    socket.current.onclose = () => {
      console.log('Socket closed');
    };

    socket.current.onerror = (err) => {
      console.log('Socket error', err);
    };

    socket.current.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case 'INIT':
          setUsers(payload.users);
          break;
        case 'NEW_MESSAGE':
          setMessages((prevMessages) => [...prevMessages, payload.message]);
          break;
        default:
          console.log('Unknown message type', type);
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
          <ChatComponent messages={messages} loggedUser={loggedUser} />
        </Col>
      </Row>
    </Container>
  );
}
