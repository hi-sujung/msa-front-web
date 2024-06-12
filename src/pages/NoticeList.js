import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const noticeUrl = process.env.REACT_APP_NOTICE_API_URL;


  useEffect(() => {
    
    const fetchNotices = async () => {
      try {
        const response = await axios.get(noticeUrl);
        if (response.status === 200) {
          setNotices(response.data);
        }
      } catch (err) {
        console.log('Error fetching searching activity data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>공지사항</h1>
      <ul>
      {notices.map(notice => (
          <li key={notice.id}>
            <p>{notice.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notices;
