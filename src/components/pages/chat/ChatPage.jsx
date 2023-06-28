import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import UsersList from './ui/UsersList';
import ChatComponent from './ui/ChatComponent';

export default function ChatPage({ messages: initMessages }) {
  const [messages, setMessages] = useState(initMessages);
  const [users, setUsers] = useState([]);
  return (
    <Container>
      <Row>
        <Col>Chat page</Col>
      </Row>
      <Row>
        <Col xs={2}>
          <UsersList users={users} />
        </Col>
        <Col xs={10}>
          <ChatComponent messages={messages} />
        </Col>
      </Row>
    </Container>
  );
}
