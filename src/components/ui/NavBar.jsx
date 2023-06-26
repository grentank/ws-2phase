import React from 'react';
import { useLocation } from 'react-router-dom';
import ChatQuotesIcon from './icons/ChatQuotesIcon';

export default function NavBar() {
  const location = useLocation();
  const navigation = [
    {
      className: `nav-link${location.pathname === '/' ? ' active' : ''}`,
      href: '/',
      text: 'Home',
    },
    {
      className: `nav-link${location.pathname === '/chat' ? ' active' : ''}`,
      href: '/chat',
      text: 'Chat',
    },
    {
      className: `nav-link${location.pathname === '/auth' ? ' active' : ''}`,
      href: '/auth',
      text: 'Auth',
    },
  ];
  return (
    <nav className="navbar navbar-expand bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <h1>
            <ChatQuotesIcon />
          </h1>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-pills">
            {navigation.map(({ className, href, text }) => (
              <li className="nav-item" key={href}>
                <a className={className} aria-current="page" href={href}>
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
