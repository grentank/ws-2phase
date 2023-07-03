import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from '../../../ui/icons/SendIcon';

export default function MessageForm({ submitHandler, currentWriterHandler }) {
  const [input, setInput] = useState(null);
  const changeHandler = (e) => setInput(e.target.value);
  useEffect(() => {
    if (input?.length === 1) currentWriterHandler(true);
    else if (input?.length === 0) currentWriterHandler(false);
  }, [input]);
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler(input);
        setInput('');
      }}
    >
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={input}
          onChange={changeHandler}
        />
        <InputGroup.Text id="basic-addon2">
          <Button variant="outline-primary" type="submit">
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
