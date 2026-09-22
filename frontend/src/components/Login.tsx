import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, fetchCsrfToken } from '../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/common.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCsrfToken()
      .then(setCsrfToken)
      .catch(() => setCsrfToken(''));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await login(username, password, csrfToken);
      navigate('/');
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message ?? 'Login failed';
      setError(errMsg);
    }
  };

  return (
    <div className="container">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h2 className="form-heading">Log in</h2>
        <div className={`form-group ${error ? 'has-error' : ''}`}>
          {message && <span>{message}</span>}
          <input
            name="username"
            type="text"
            className="form-control"
            placeholder="Username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <span>{error}</span>}
          <input type="hidden" name="_csrf" value={csrfToken} />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Log In
          </button>
          <h4 className="text-center">
            <a href="/registration">Create an account</a>
          </h4>
        </div>
      </form>
    </div>
  );
};

export default Login;