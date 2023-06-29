import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UsersList from './ui/UsersList';
import ChatComponent from './ui/ChatComponent';

const initUsers = [{ name: 'Alex' }, { name: 'Bob' }, { name: 'Carl' }];

export default function ChatPage({ messages: initMessages, user: loggedUser }) {
  const [messages, setMessages] = useState(initMessages);
  const [users, setUsers] = useState(initUsers);
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
