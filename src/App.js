import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NoticeList from './pages/NoticeList';
import ActivityList from './pages/ActivityList';
import Activity from './pages/Activity';
import Notice from './pages/Notice';
import LikedNotice from './pages/LikedNotice';
import { AuthProvider } from './utils/AuthContext';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/likedNotice" element={<LikedNotice />} />
        <Route path="/noticeList" element={<NoticeList />} />
        <Route path="/activityList" element={<ActivityList />} />
        <Route path="/notice/:activityId" element={<Notice />} />
        <Route path="/activity/:activityId" element={<Activity />} />
      </Routes>
    </div>
  );
}

export default App;
