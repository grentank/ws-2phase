import React from 'react';
import { Stack } from 'react-bootstrap';

export default function UsersList({ users }) {
  return (
    <Stack>
      {users.map((user) => (
        <div className="p-2" key={user.id}>
          {user.name}
        </div>
      ))}
    </Stack>
  );
}
