import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import '../styles/PortfolioList.css';

export default function PortfolioList() {
  const [portfolioList, setPortfolioList] = useState([]);
  const token = localStorage.getItem('token');
  const SPRING_GATEWAY_URL = process.env.REACT_APP_SPRING_GATEWAY_URL;

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      const response = await axios.get(`${SPRING_GATEWAY_URL}/portfolio/portfoliolist`, { headers });
      if (response.status === 200) {
        setPortfolioList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  return (
    <div className="container">
      <Header />
      <header className="header">
        <a href="/main" className="home-button">Home</a>
        <h1>나의 포트폴리오 목록</h1>
      </header>
      <main className="main">
        <a href="/createportfolio" className="nav-button-plus">추가</a>
        <ul className="portfolio-list">
          {portfolioList.map((item) => (
            <li key={item.id} className="portfolio-item">
              <a href={`/myportfolio/${item.id}`}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>{item.urlLink}</p>
                <p>{item.createdDate}</p>
                <p>{item.modifiedDate}</p>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
