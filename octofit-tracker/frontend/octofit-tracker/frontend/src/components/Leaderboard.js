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
      <div className="card-header bg-success text-white">
        <h2 className="h4 mb-0">Leaderboard</h2>
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
    </div>
  );
}

export default Leaderboard;
