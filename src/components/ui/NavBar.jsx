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
      text: 'Главная',
    },
    {
      active: location.pathname === '/chat',
      href: '/chat',
      text: 'Чат',
    },
    {
      active: location.pathname === '/auth',
      href: '/auth',
      text: 'Войти',
    },
    {
      active: location.pathname === '/profile',
      href: '/profile',
      text: 'Профиль',
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
