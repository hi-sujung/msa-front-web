import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MyPortfolio.css';

export default function MyPortfolio() {
  const params = new URLSearchParams(window.location.search);
  const portfolioId = params.get('portfolioId');

  const [portfolioData, setPortfolioData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSubTitle, setEditedSubTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  // 임시로 로컬 스토리지에서 토큰을 가져옴
  const token = localStorage.getItem('token');
  const PORTFOLIO_URL = process.env.PORTFOLIO_URL;

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${PORTFOLIO_URL}/id?id=${portfolioId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setPortfolioData(response.data.data);
        setEditedTitle(response.data.data.title);
        setEditedSubTitle(response.data.data.urlLink);
        setEditedContent(response.data.data.description);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  const handleSaveButton = async () => {
    const updatedData = {
      title: editedTitle,
      urlLink: editedSubTitle,
      description: editedContent,
    };

    try {
      const response = await axios.post(
        `${PORTFOLIO_URL}/update/id?id=${portfolioId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        setPortfolioData(updatedData);
        setIsEditMode(false);
        fetchPortfolioData();
      } else {
        console.error('Failed to update portfolio:', response.status);
      }
    } catch (error) {
      console.error('Error updating portfolio:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${PORTFOLIO_URL}/portfolio/id?id=${portfolioId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        console.log('Portfolio deleted');
        window.location.href = '/main'; // 페이지 이동
      } else {
        console.error('Failed to delete portfolio:', response.status);
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <a href="/main" className="home-button">Home</a>
        <h1>포트폴리오 관리</h1>
      </header>
      <main className="main">
        {isEditMode ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h2>{portfolioData.title}</h2>
        )}
        <button onClick={() => setIsEditMode(!isEditMode)}>
          {isEditMode ? '취소' : '수정'}
        </button>
        {isEditMode ? (
          <>
            <input
              type="text"
              value={editedSubTitle}
              onChange={(e) => setEditedSubTitle(e.target.value)}
            />
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button onClick={handleSaveButton}>저장하기</button>
          </>
        ) : (
          <>
            <p>{portfolioData.urlLink}</p>
            <p>{portfolioData.description}</p>
          </>
        )}
        <button onClick={handleDelete}>삭제</button>
      </main>
    </div>
  );
}
