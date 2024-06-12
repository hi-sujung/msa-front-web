import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8083/notice/externalact';
const R_API_URL = 'http://10.0.2.2:8083/notice/univactivity';
const email = '20211149@sungshin.ac.kr';

export default function ActivityScreen({ route }) {
    const [initialLikedState, setInitialLikedState] = useState(false);
    const [heartFilled, setHeartFilled] = useState('');
    const [attendFilled, setAttendFilled] = useState("");
    const { activityId } = route.params;
    const [activityData, setActivityData] = useState({});
    const [recActivityData, setRecActivityData] = useState([]);

    useEffect(() => {
      fetchActivityDetail();
      fetchRecActivityDetail();
    }, []);
    
    const fetchActivityDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/id?id=${activityId}&memberId=${email}`);
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
      try {
        const response = await axios.post(`${API_URL}/like?actId=${activityId}`);
        if (response.status === 200) {
          setHeartFilled(true);
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    };
    
    const toggleAttend = async () => {
      try {
        const response = await axios.post(`${API_URL}/check?actId=${activityId}&memberId=${email}`);
        if (response.status === 200) {
          setAttendFilled(true);
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
        const response = await axios.get(`${API_URL}/?id=1${activityId}`);
        if (response.status === 200) {
          setRecActivityData(response.data);
        }
      } catch (error) {
        console.error('Error fetching recommended activity detail:', error);
      }
    };
    
    const handleActListPress = () => {
      // Handle navigation
    };
    
    const handleActivityPress = (id) => {
      // Handle navigation
    };
    
    const handleHomePress = () => {
      // Handle navigation
    };

    return (
      <div className="container">
        <div className="header">
          <button onClick={handleHomePress} className="homeButton">Home</button>
          <button onClick={handleActListPress}>게시물 목록</button>
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
                <span className="activityCategory">대외활동</span>
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
              {heartFilled ? "Heart" : "Empty Heart"}
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
              <div className="recommendedItem" key={item.external_act_id}>
                <span className="recommendedItemTitle">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
