import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function MailCheck() {
  const [email, setEmail] = useState('');
  const [string, setString] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [result, setResult] = useState('');
  const [selectedRole, setSelectedRole] = useState('admin');
  const navigate = useHistory();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleEmailCheck = async () => {
    const response = await fetch(`https://pizza-express-git-webcode-mohamedsiddiq88.vercel.app/${selectedRole}/checkmail`, {
      method: 'POST',
      body: JSON.stringify({ email:email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!(data.data=="invalid")) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
      alert('Invalid email');
    }
  };

  const handlePasswordReset = async () => {
    const token = 'your_token'; // Replace with your token
    const response = await fetch(`https://pizza-express-git-webcode-mohamedsiddiq88.vercel.app/${selectedRole}/checkstring?token=${string}`, {
      method: 'POST',
      body: JSON.stringify({ randomString:string }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setResult(data.data);
    if(data.data!=="invalid token"){
    console.log(data.data);
    navigate.push(`/resetpassword?token=${string}`)
    }
  };

  return (
    <div className="container mt-5 login_container">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="text-center ">
            <button
              className={`btn btn-outline-primary ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleChange('admin')}
              style={{ width: '50%' }}
            >
              Admin
            </button>
            <button
              className={`btn btn-outline-primary ${selectedRole === 'users' ? 'active' : ''}`}
              onClick={() => handleRoleChange('users')}
              style={{ width: '50%' }}
            >
              User
            </button>
          </div>
          <div className="card">
            <div className="card-body">
              {selectedRole === 'admin' ? (
                <div>
                  <h5 className="card-title">Admin Mail Check</h5>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleEmailCheck}>
                    Next
                  </button>
                  {isEmailValid && (
                    <div>
                      <label>String</label>
                      <input
                        type="text"
                        id="string"
                        className="form-control"
                        name="string"
                        required
                        value={string}
                        onChange={(e) => setString(e.target.value)}
                      />
                      <button className="btn btn-primary" onClick={handlePasswordReset}>
                        Reset Password
                      </button>
                      <p>{result}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h5 className="card-title">User Mail Check</h5>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleEmailCheck}>
                    Next
                  </button>
                  {isEmailValid && (
                    <div>
                      <label>String</label>
                      <input
                        type="text"
                        id="string"
                        className="form-control"
                        name="string"
                        required
                        value={string}
                        onChange={(e) => setString(e.target.value)}
                      />
                      <button className="btn btn-primary" onClick={handlePasswordReset}>
                        Reset Password
                      </button>
                      <p>{result}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailCheck;
