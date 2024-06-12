import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import NoticeList from './pages/NoticeList';
import ActivityList from './pages/ActivityList';
import Login from './pages/Login';
import MailSend from './pages/MailSend';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/noticeList" element={<NoticeList />} />
        <Route path="/activityList" element={<ActivityList />} />
        {/* 다른 페이지들도 추가 가능 */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/mailSend" element={<MailSend />} /> 
      </Routes>
    </div>
  );
}

export default App;
