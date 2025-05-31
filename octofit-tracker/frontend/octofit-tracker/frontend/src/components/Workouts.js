import React, { useEffect, useState } from 'react';

const WORKOUTS_API = 'https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(WORKOUTS_API)
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-warning text-dark">
        <h2 className="h4 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
              <tr key={workout._id}>
                <td>{workout.description}</td>
                <td>{workout.date ? new Date(workout.date).toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
