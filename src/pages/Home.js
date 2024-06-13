import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFundProjectionScreen, AiOutlineNotification, AiOutlineRobot } from 'react-icons/ai';
import '../styles/Home.css';
import { useAuth } from './../utils/AuthContext';

function Home() {
  const { user, token } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    if (token !== null) {
      setUserName(user.userName);
    }
  };

  return (
    <div className="homeLinearGradient">
      <div className="homeContainer">
        <div className="homeOuterBox">
          <h1 className="homeTitle">
            {userName ? `Hi, ${userName} 수정이🔮` : 'Hi, 수정이🔮'}
          </h1>
          {/* <h1 className="homeTitle">Hi, 수정이🔮</h1> */}
          <div className="homeRow">
            <Link to="/noticeList" className="homeButton homeSecondButton">
              <AiOutlineNotification size={50} className="homeButtonIcon" />
              <p className="homeButtonText">공지사항<br />조회</p>
            </Link>
            <Link to="/activityList" className="homeButton homeThirdButton">
              <AiOutlineNotification size={50} className="homeButtonIcon" />
              <p className="homeButtonText homeThirdButtonText">대외활동<br />조회</p>
            </Link>
            <Link to="/portfolioList" className="homeButton homeFirstButton">
              <AiOutlineFundProjectionScreen size={50} className="homeButtonIcon" />
              <p className="homeButtonText">포트폴리오</p>
            </Link>
          </div>
        </div>
        <Link to="/" className="homeChatBotButton">
          <AiOutlineRobot size={20} />
          <p className="homeChatBotButtonText">로그인</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
