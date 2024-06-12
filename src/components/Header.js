import React from 'react';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">회원가입</Link></li>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/noticeList">공지사항</Link></li>
          <li><Link to="/activityList">대외활동</Link></li>
          <li><Link to="/likedNotice">찜한 활동</Link></li>
          <li><Link to="/likedNotice">찜한 활동</Link></li>
          <li><Link to="/portfolioList">포트폴리오 목록</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
