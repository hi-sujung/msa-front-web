import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

function Logout() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem('token', null); // 토큰 삭제

    alert('로그아웃되었습니다.');

        navigate('/'); 
  };

  return (
    <div className="linear-gradient">
      <div className="container">
        <h1 className="title">안녕, 수정이</h1>
        <button className="button" onClick={handleLogout}>
          로그아웃
        </button>
        
      </div>
    </div>
  );
}

export default Logout;