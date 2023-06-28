import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import EditIcon from '../../ui/icons/EditIcon';

export default function ProfilePage({ user }) {
  const [isEditing, setIsEditing] = useState({ email: false, password: false });
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    phone: user.phone,
  });
  const changeHandler = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const editHandler = (key) => setIsEditing((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhone">
        <Form.Label column sm="2">
          Телефон
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={formData.phone} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            plaintext={!isEditing.email}
            readOnly={!isEditing.email}
            value={formData.email}
            onChange={changeHandler}
          />
        </Col>
        <Col sm="1">
          <Button onClick={() => editHandler('email')}>
            <EditIcon />
          </Button>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
        <Form.Label column sm="2">
          Имя
        </Form.Label>
        <Col sm="9">
          <Form.Control
            name="name"
            type="text"
            placeholder="Имя"
            plaintext={!isEditing.name}
            readOnly={!isEditing.name}
            value={formData.name}
            onChange={changeHandler}
          />
        </Col>
        <Col sm="1">
          <Button onClick={() => editHandler('name')}>
            <EditIcon />
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
