import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';

export default function ChatComponent({ messages }) {
  return (
    <Container>
      <Row>
        <MessagesList messages={messages} />
      </Row>
      <Row>
        <MessageForm />
      </Row>
    </Container>
  );
}
