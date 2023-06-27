import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import ChatQuotesIcon from './icons/ChatQuotesIcon';

export default function NavBar() {
  const location = useLocation();
  const navigation = [
    {
      active: location.pathname === '/',
      href: '/',
      text: 'Home',
    },
    {
      active: location.pathname === '/chat',
      href: '/chat',
      text: 'Chat',
    },
    {
      active: location.pathname === '/auth',
      href: '/auth',
      text: 'Auth',
    },
  ];
  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/">
          <ChatQuotesIcon />
        </Navbar.Brand>
        <Nav className="me-auto" defaultActiveKey="/" variant="pills">
          {navigation.map(({ active, href, text }) => (
            <Nav.Link key={href} active={active} href={href} eventKey={href}>
              {text}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}
