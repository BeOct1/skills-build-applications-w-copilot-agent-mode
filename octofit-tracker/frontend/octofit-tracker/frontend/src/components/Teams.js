import React, { useEffect, useState, useRef } from 'react';

const TEAMS_API = 'https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const nameRef = useRef();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch(TEAMS_API)
      .then(res => res.json())
      .then(data => setTeams(data));
  }, []);

  const handleAddTeam = (e) => {
    e.preventDefault();
    setFormError('');
    const name = nameRef.current.value.trim();
    if (!name) {
      setFormError('Team name is required.');
      return;
    }
    fetch(TEAMS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add team');
        return res.json();
      })
      .then(newTeam => {
        setTeams(teams => [...teams, newTeam]);
        nameRef.current.value = '';
        document.getElementById('closeTeamModal').click();
      })
      .catch(() => setFormError('Failed to add team.'));
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Teams</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTeamModal">Add Team</button>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team._id}>
                <td>{team.name}</td>
                <td>{team.members ? team.members.length : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for adding team */}
      <div className="modal fade" id="addTeamModal" tabIndex="-1" aria-labelledby="addTeamModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTeamModalLabel">Add Team</h5>
              <button type="button" className="btn-close" id="closeTeamModal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {formError && <div className="alert alert-danger">{formError}</div>}
              <form onSubmit={handleAddTeam} autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="teamName" className="form-label">Team Name</label>
                  <input type="text" className="form-control" id="teamName" ref={nameRef} required />
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

export default Teams;
