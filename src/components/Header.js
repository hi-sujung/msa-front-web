import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/register">회원가입</a></li>
          <li><a href="/noticeList">공지사항</a></li>
          <li><a href="/activityList">대외활동</a></li>
          <li><a href="/portfolioList">포트폴리오 목록</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
