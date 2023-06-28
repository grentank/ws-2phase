import React from 'react';
import { Card } from 'react-bootstrap';

export default function ChatMessage({ message }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{message.User.name}</Card.Subtitle>
        <Card.Text>{message.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
