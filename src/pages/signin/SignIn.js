import React, { useState } from 'react';

import { useSignUp } from '../../hooks/useSignUp';

function SignIn() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const { signup, error, isPending } = useSignUp();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confPassword) {
      signup(email, password, name);
    } else {
      alert("passwords don't match");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
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
      <label>
        <span>Confirm Password:</span>
        <input
          type="password"
          required
          onChange={(e) => setConfPassword(e.target.value)}
          value={confPassword}
        />
      </label>
      <button>SUBMIT</button>
      {error && <p className="error">{error}</p>}
      {isPending && <p>{isPending}</p>}
    </form>
  );
}

export default SignIn;
