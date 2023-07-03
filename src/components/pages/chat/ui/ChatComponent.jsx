import React from 'react';
import { Stack } from 'react-bootstrap';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';

export default function ChatComponent({ currentWriterHandler, messages, loggedUser, submitHandler, currentWriter }) {
  return (
    <Stack>
      <MessagesList messages={messages} loggedUser={loggedUser} />
      <div className="fs-6 fw-light">
        {currentWriter ? `${currentWriter.name} печатает...` : `\xa0`}
      </div>
      <MessageForm currentWriterHandler={currentWriterHandler} submitHandler={submitHandler} />
    </Stack>
  );
}
