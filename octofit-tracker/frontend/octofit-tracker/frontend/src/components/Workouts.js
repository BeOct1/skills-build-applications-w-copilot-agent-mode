import React, { useEffect, useRef, useState } from 'react';

const WORKOUTS_API = 'https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const descRef = useRef();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch(WORKOUTS_API)
      .then(res => res.json())
      .then(data => setWorkouts(data));
  }, []);

  const handleAddWorkout = (e) => {
    e.preventDefault();
    setFormError('');
    const description = descRef.current.value.trim();
    if (!description) {
      setFormError('Description is required.');
      return;
    }
    fetch(WORKOUTS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add workout');
        return res.json();
      })
      .then(newWorkout => {
        setWorkouts(workouts => [...workouts, newWorkout]);
        descRef.current.value = '';
        document.getElementById('closeWorkoutModal').click();
      })
      .catch(() => setFormError('Failed to add workout.'));
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Workouts</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkoutModal">Add Workout</button>
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
      {/* Modal for adding workout */}
      <div className="modal fade" id="addWorkoutModal" tabIndex="-1" aria-labelledby="addWorkoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addWorkoutModalLabel">Add Workout</h5>
              <button type="button" className="btn-close" id="closeWorkoutModal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {formError && <div className="alert alert-danger">{formError}</div>}
              <form onSubmit={handleAddWorkout} autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="workoutDescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="workoutDescription" ref={descRef} required />
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

export default Workouts;
