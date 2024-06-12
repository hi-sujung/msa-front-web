import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Notices from './pages/Notices';
import Activities from './pages/Activities';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/activities" element={<Activities />} />
        {/* 다른 페이지들도 추가 가능 */}
      </Routes>
    </div>
  );
}

export default App;
