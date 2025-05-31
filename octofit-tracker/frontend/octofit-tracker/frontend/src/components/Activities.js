import React, { useEffect, useState, useRef } from 'react';

const ACTIVITIES_API = 'https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/activity/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const typeRef = useRef();
  const durationRef = useRef();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch(ACTIVITIES_API)
      .then(res => res.json())
      .then(data => setActivities(data));
  }, []);

  const handleAddActivity = (e) => {
    e.preventDefault();
    setFormError('');
    const activity_type = typeRef.current.value.trim();
    const duration = durationRef.current.value;
    if (!activity_type || !duration) {
      setFormError('All fields are required.');
      return;
    }
    fetch(ACTIVITIES_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activity_type, duration })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add activity');
        return res.json();
      })
      .then(newActivity => {
        setActivities(activities => [...activities, newActivity]);
        typeRef.current.value = '';
        durationRef.current.value = '';
        document.getElementById('closeActivityModal').click();
      })
      .catch(() => setFormError('Failed to add activity.'));
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Activities</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addActivityModal">Add Activity</button>
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
      {/* Modal for adding activity */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
              <button type="button" className="btn-close" id="closeActivityModal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {formError && <div className="alert alert-danger">{formError}</div>}
              <form onSubmit={handleAddActivity} autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="activityType" className="form-label">Type</label>
                  <input type="text" className="form-control" id="activityType" ref={typeRef} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="activityDuration" className="form-label">Duration (min)</label>
                  <input type="number" className="form-control" id="activityDuration" ref={durationRef} required min={1} />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
