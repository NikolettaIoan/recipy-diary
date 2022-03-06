import React, { useState } from 'react';

import { useLogin } from '../../hooks/useLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, login, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Email:</span>
        <input
          type="text"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button>SUBMIT</button>
      {error && <p className="error">{error}</p>}
      {isPending && <p>{isPending}</p>}
    </form>
  );
}

export default Login;
