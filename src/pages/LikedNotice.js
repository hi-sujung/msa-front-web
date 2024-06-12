import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './../utils/AuthContext';

const springNoticeUrl = process.env.REACT_APP_SPRING_GATEWAY_NOTICE_URL;
const springActivityUrl = process.env.REACT_APP_SPRING_GATEWAY_ACTIVITY_URL;

export default function Notice() {
  const [uniLikeList, setUniLikeList] = useState([]);
  const [extLikeList, setExtLikeList] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    fetchUniLikeData();
    fetchExtLikeData();
  }, []);

  const fetchUniLikeData = async () => {
    const headers = {
        Authorization: `Bearer ${token}`
      };

    try {
      const response = await axios.get(`${springNoticeUrl}like-list`, {headers});
      if (response.status === 200) {
        setUniLikeList(response.data); 
      }
    } catch (error) {
      console.error('Error fetching uniLike list data:', error);
    }
  };

  const fetchExtLikeData = async () => {
    const headers = {
        Authorization: `Bearer ${token}`
      };

    try {
      const response = await axios.get(`${springActivityUrl}like-list`, {headers});
      if (response.status === 200) {
        setExtLikeList(response.data); 
      }
    } catch (error) {
      console.error('Error fetching external like list data:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <Link to="/main" className="homeButton">
          <i className="fas fa-home" style={{ color: 'rgba(74, 85, 162, 1)' }}></i>
        </Link>
        <h1 className="headerTitle">찜한 활동</h1>
      </div>

      <div className="main">
        {/* 찜한 공지사항 목록 */}
        <ul className="activityList">
          {uniLikeList.map(item => (
            <li className="activityItem" key={item.id}>
              <div className="activityDetails">
                <span className="activityCategory">공지사항</span>
              </div>
              <span className="activityItemTitle">{item.title}</span>
            </li>
          ))}
          {extLikeList.map(item => (
            <li className="activityItem" key={item.id}>
              <div className="activityDetails">
                <span className="activityCategory">대외활동</span>
              </div>
              <span className="activityItemTitle">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
