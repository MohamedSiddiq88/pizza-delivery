import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const role = searchParams.get('role');
  const [isValidToken, setIsValidToken] = useState(false);

  const handlePasswordReset = async () => {
    if (password !== reenteredPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const requestData = {
      email: email,
      password: password,
      token: token
    };

    const response = await fetch(`https://pizza-express-git-webcode-mohamedsiddiq88.vercel.app/${role}/reset-password`, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      alert('Password updated successfully');
    } else {
      alert('Failed to update password');
    }
  };

  const handle = async () => {
    const response = await fetch(`https://pizza-express-git-webcode-mohamedsiddiq88.vercel.app/users/checkstring?token=${token}`, {
      method: 'POST',
      body: JSON.stringify({ randomString: token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.data !== 'invalid token') {
      console.log(data.data.email);
      setEmail(data.data.email);
      setIsValidToken(true);
    } else {
      setIsValidToken(false);
    }
  };

  useEffect(() => {
    handle();
  }, []);

  if (!isValidToken) {
    return <div>Please generate String</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>

      <div className="form-group">
        <label>Email:</label>
        <p>{email}</p>
      </div>

      <div className="form-group">
        <label>New Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Re-enter Password:</label>
        <input
          type="password"
          className="form-control"
          value={reenteredPassword}
          onChange={(e) => setReenteredPassword(e.target.value)}
        />
      </div>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <button className="btn btn-primary" onClick={handlePasswordReset}>
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;
