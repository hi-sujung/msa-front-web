import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AttendActList.css';

export default function AttendActList() {
  const [attendList, setAttendList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [careerKeyword, setCareerKeyword] = useState('');
  const [portfolioTitle, setPortfolioTitle] = useState('');
  // const { user, token } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const springNoticeUrl = process.env.REACT_APP_SPRING_GATEWAY_NOTICE_URL;
  const springActivityUrl = process.env.REACT_APP_SPRING_GATEWAY_ACTIVITY_URL;
  const springAutoCreateUrl = process.env.REACT_APP_SPRING_GATEWAY_AUTOPORTFOLIO_URL;

  useEffect(() => {
    fetchAttendData();
  }, []);

  const fetchAttendData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      // const response = await axios.get(`${springActivityUrl}checked-list`, { headers });
      const response = await axios.get(`/hisujung/notice/externalact/checked-list`, { headers });
      if (response.status === 200) {
        setAttendList(response.data);
      }
    } catch (error) {
      console.error('Error fetching attended list data:', error);
    }
  };

  const createAutoPortfolio = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`
      };

      // const response = await axios.post(`${springAutoCreateUrl}create-by-ai?careerField=${careerKeyword}&title=${portfolioTitle}`, { headers });
      const response = await axios.post(`/hisujung/notice/portfolio/create-by-ai?careerField=${careerKeyword}&title=${portfolioTitle}`, { headers });
      if (response.status === 200) {
        console.log("포트폴리오 자동 생성 완료");
      }
    } catch (error) {
      console.error('Error Auto-Creating portfolio data:', error);
    }
  };

  const handleHomePress = () => {
    navigate('/'); 
  };

  const handleActivityPress = (activityId) => {
    navigate(`/activity/${activityId}`);
  };

  const handleCreatePortfolioPress = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    createAutoPortfolio();
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="container">
        <div className="linearGradient">
          <div className="header">
            <button className="homeButton" onClick={handleHomePress}>
              <i className="fas fa-home"></i>
            </button>
            <h1 className="headerTitle">참여한 대외활동 목록</h1>
          </div>
        </div>

        <div className="main">
          <button className="navButtonPlus" onClick={handleCreatePortfolioPress}>
            포트폴리오 자동 생성
          </button>
          <ul>
            {attendList.map((item) => (
              <li key={item.id} className="activityItem" onClick={() => handleActivityPress(item.id)}>
                <div className="activityDetails">
                  <span className="activityCategory">참여한 대외활동</span>
                </div>
                <span className="activityItemTitle">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {modalVisible && (
        <div className="modalContainer">
          <div className="modalView">
            <p className="modalText">1. 포트폴리오 제목을 입력하세요.</p>
            <input
              className="modalInput"
              placeholder="제목 입력"
              value={portfolioTitle}
              onChange={(e) => setPortfolioTitle(e.target.value)}
            />
            <p className="modalText">2. 커리어 키워드를 입력하세요.</p>
            <input
              className="modalInput"
              placeholder="키워드 입력"
              value={careerKeyword}
              onChange={(e) => setCareerKeyword(e.target.value)}
            />
            <div className="modalButtons">
              <button className="modalButton" onClick={handleModalSubmit}>확인</button>
              <button className="modalButton" onClick={handleModalCancel}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}