import React, { useEffect, useState } from 'react';

const LEADERBOARD_API = 'https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/leaderboard/';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch(LEADERBOARD_API)
      .then(res => res.json())
      .then(data => setLeaderboard(data));
  }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Leaderboard</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addLeaderboardModal">Add Entry</button>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry._id}>
                <td>{entry.team}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for adding leaderboard entry */}
      <div className="modal fade" id="addLeaderboardModal" tabIndex="-1" aria-labelledby="addLeaderboardModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addLeaderboardModalLabel">Add Leaderboard Entry</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="leaderboardTeam" className="form-label">Team</label>
                  <input type="text" className="form-control" id="leaderboardTeam" />
                </div>
                <div className="mb-3">
                  <label htmlFor="leaderboardPoints" className="form-label">Points</label>
                  <input type="number" className="form-control" id="leaderboardPoints" />
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

export default Leaderboard;
