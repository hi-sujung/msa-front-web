import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart, AiFillHome } from 'react-icons/ai';
import { useAuth } from './../utils/AuthContext';
import '../styles/Activity.css';

const activityUrl = process.env.REACT_APP_NOTICE_API_URL;
const springNoticeUrl = process.env.REACT_APP_SPRING_GATEWAY_NOTICE_URL;
const recNotice = process.env.REACT_APP_REC_API_URL;

const SPRING_GATEWAY_URL = '';


export default function Notice() {
  const [initialLikedState, setInitialLikedState] = useState(false);
  const [heartFilled, setHeartFilled] = useState('');
  const [attendFilled, setAttendFilled] = useState('');
  const { activityId } = useParams();
  const [activityData, setActivityData] = useState({});
  const [recActivityData, setRecActivityData] = useState([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivityDetail();
    fetchRecActivityDetail();
  }, []);

  const fetchActivityDetail = async () => {
    const headers = {
        Authorization: `Bearer ${token}`
    };

    try {
      const response = await axios.get(`${springNoticeUrl}id?actId=${activityId}`, {headers});
      if (response.status === 200) {
        const data = response.data;
        setActivityData(data);
        setHeartFilled(data.isLiked === 1);
        setAttendFilled(data.participated === 1);
      }
    } catch (error) {
      console.error('Error fetching activity detail:', error);
    }
  };

  const toggleHeart = async () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      if (heartFilled) {
        const response = await axios.delete(`${springNoticeUrl}likecancel?id=${activityId}`, { headers });
        if (response.status === 200) {
          setHeartFilled(false);
        }
      } else {
        const response = await axios.post(`${springNoticeUrl}like?actId=${activityId}`, { headers });
        if (response.status === 200) {
          setHeartFilled(true);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const toggleAttend = async () => {
    const headers = {
      Authorization: `Bearer ${token}`
    };

    try {
      if (attendFilled) {
        const response = await axios.delete(`${springNoticeUrl}check-cancel?id=${activityId}`, {headers});
        if (response.status === 200) {
          setAttendFilled(false);
        }
      } else {
        const response = await axios.post(`${springNoticeUrl}check?actId=${activityId}`, {headers});
        if (response.status === 200) {
          setAttendFilled(true);
        }
      }
    } catch (error) {
      console.error('Error toggling attendance:', error);
    }
  };

  const handleReplace = () => {
    if (activityData && activityData.content) {
      return activityData.content.replaceAll('\\n', "\n");
    } else {
      console.log('activityData or content is undefined');
      return '';
    }
  };

  const formattedContent = handleReplace();

  const fetchRecActivityDetail = async () => {
    try {
      const response = await axios.get(`${recNotice}?id=${activityId}`);
      if (response.status === 200) {
        setRecActivityData(response.data);
      }
    } catch (error) {
      console.error('Error fetching recommended activity detail:', error);
    }
  };

  const handleActListPress = () => {
    navigate('/actList');
  };

  const handleActivityPress = (id) => {
    navigate(`/notice/${id}`);
  };

  const handleHomePress = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="linearGradient">
        <div className="header">
          <button onClick={handleHomePress} className="homeButton">
            <AiFillHome />
          </button>
          <button onClick={handleActListPress}>
            게시물 목록
          </button>
        </div>
      </div>

      <div className="nav">
        <div className="navContent">
          <button className="navButton">전체</button>
          <button className="navButton">기획</button>
          <button className="navButton">아이디어</button>
          <button className="navButton">브랜드/네이밍</button>
          <button className="navButton">광고/마케팅</button>
          <button className="navButton">사진</button>
          <button className="navButton">개발/프로그래밍</button>
        </div>
      </div>

      <div className="main">
        <div className="activityList">
          <div className="activityItem">
            <div className="activityDetails">
              <span className="activityCategory">공지사항</span>
            </div>
            <div>
              <h1 className="activityItemTitle">{activityData.title}</h1>
              <p className="activitySubTitle">{activityData.link}</p>
              <p className="activityDescription">{formattedContent}</p>
            </div>
          </div>
        </div>

        <div className="buttonContainer">
          <button className="heartButton" onClick={toggleHeart}>
            {heartFilled ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
          </button>
          <button
            className="attendButton"
            onClick={toggleAttend}
            style={{ backgroundColor: attendFilled ? "grey" : "rgba(153, 153, 255, 0.3)" }}
          >
            {attendFilled ? "참여 취소" : "참여"}
          </button>
        </div>

        <div className="recommended">
          <h2 className="recommendedTitle">추천 게시물</h2>
          {recActivityData.map(item => (
            <div className="recommendedItem" key={item.external_act_id} onClick={() => handleActivityPress(item.external_act_id)}>
              <span className="recommendedItemTitle">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
