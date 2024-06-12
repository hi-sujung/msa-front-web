import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import NoticeList from './pages/NoticeList';
import ActivityList from './pages/ActivityList';
import PortfolioList from './pages/PortfolioList';
import MyPortfolio from './pages/MyPortfolio';
import CreatePortfolio from './pages/CreatePortfolio';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/noticeList" element={<NoticeList />} />
        <Route path="/activityList" element={<ActivityList />} />
        <Route path='/portfolioList' element={<PortfolioList />} />
        <Route path='/myportfolio/:portfolioId' element={<MyPortfolio />} />
        <Route path='createportfolio' element={<CreatePortfolio />} />
        {/* 다른 페이지들도 추가 가능 */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
