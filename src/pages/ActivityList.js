import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const activityUrl = process.env.REACT_APP_ACTIVITY_API_URL;


  useEffect(() => {
    
    const fetchActivities = async () => {
      try {
        const response = await axios.get(activityUrl);
        if (response.status === 200) {
          setActivities(response.data);
        }
      } catch (err) {
        console.log('Error fetching searching activity data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>대외활동</h1>
      <ul>
      {activities.map(activity => (
          <li key={activity.id}>
            <p>{activity.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
