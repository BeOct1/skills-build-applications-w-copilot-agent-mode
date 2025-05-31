import React, { useEffect, useRef, useState } from 'react';

const USERS_API = 'https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetch(USERS_API)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    setFormError('');
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    if (!name || !email || !password) {
      setFormError('All fields are required.');
      return;
    }
    fetch('https://glorious-space-pancake-r4756p6rvgq52ppr9-8000.app.github.dev/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add user');
        return res.json();
      })
      .then(newUser => {
        setUsers(users => [...users, newUser]);
        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        document.getElementById('closeUserModal').click();
      })
      .catch(() => setFormError('Failed to add user. Email may already exist.'));
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Users</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for adding user */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addUserModalLabel">Add User</h5>
              <button type="button" className="btn-close" id="closeUserModal" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {formError && <div className="alert alert-danger">{formError}</div>}
              <form onSubmit={handleAddUser} autoComplete="off">
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">Name</label>
                  <input type="text" className="form-control" id="userName" ref={nameRef} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">Email</label>
                  <input type="email" className="form-control" id="userEmail" ref={emailRef} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="userPassword" className="form-label">Password</label>
                  <input type="password" className="form-control" id="userPassword" ref={passwordRef} required minLength={6} />
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

export default Users;
