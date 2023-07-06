import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            aria-label="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            aria-label="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Si no estás registrado y quieres hacerlo haz,
        <Link to="/Register"> click aquí</Link>.
      </p>
    </div>
  );
};

export default Login;
