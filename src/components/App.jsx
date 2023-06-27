import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './ui/NavBar';
import MainPage from './pages/main/MainPage';
import ChatPage from './pages/chat/ChatPage';
import AuthPage from './pages/auth/AuthPage';

export default function App({}) {
  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="auth" element={<AuthPage />} />
      </Routes>
    </Container>
  );
}
