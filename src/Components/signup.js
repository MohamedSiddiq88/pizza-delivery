import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');
  const navigate = useHistory();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleSignup = async () => {
    const userInfo = {
      name: name,
      email: email,
      password: password
    };

    try {
      let url = 'https://pizza-express-rho.vercel.app/users/signup';
      if (selectedRole === 'admin') {
        url = 'https://pizza-express-rho.vercel.app/admin/signup';
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });

      const data = await response.json();
      console.log(data);

      //  successful signup
      if (response.ok) {
        // redirect to login page 
        navigate.push('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="text-center">
            <button
              className={`btn btn-outline-primary ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
              style={{ width: '50%' }}
            >
              Admin
            </button>
            <button
              className={`btn btn-outline-primary ${selectedRole === 'user' ? 'active' : ''}`}
              onClick={() => handleRoleChange('user')}
              style={{ width: '50%' }}
            >
              User
            </button>
          </div>
          <div className="card">
            <div className="card-body">
              {selectedRole === 'admin' ? (
                <div>
                  <h5 className="card-title">Admin Signup</h5>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleSignup}>
                    Signup
                  </button>
                </div>
              ) : (
                <div>
                  <h5 className="card-title">User Signup</h5>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleSignup}>
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
