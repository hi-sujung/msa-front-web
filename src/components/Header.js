import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">회원가입</Link></li>
          <li><Link to="/notices">공지사항</Link></li>
          <li><Link to="/activities">대외활동</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
