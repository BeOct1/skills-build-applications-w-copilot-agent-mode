import React, { useEffect, useState } from 'react';

const ACTIVITIES_API = 'https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/activity/';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(ACTIVITIES_API)
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h2 className="h4 mb-0">Activities</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity._id}>
                <td>{activity.activity_type}</td>
                <td>{activity.duration}</td>
                <td>{activity.date ? new Date(activity.date).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
