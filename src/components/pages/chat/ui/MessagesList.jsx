import React from 'react';
import { Stack } from 'react-bootstrap';
import ChatMessage from './ChatMessage';

export default function MessagesList({ messages }) {
  return (
    <Stack>
      {messages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
    </Stack>
  );
}
