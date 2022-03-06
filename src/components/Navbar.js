import styles from './Navbar.module.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.name}>
        <h1>
          Recipe Diary{' '}
          {user && (
            <span>
              for <em>{user.displayName}</em>
            </span>
          )}
        </h1>
      </Link>

      {user && (
        <Link to="/create">
          <h2>Create Recipe</h2>
        </Link>
      )}
      {!user && (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signin">
            <button>Signin</button>
          </Link>
        </>
      )}
      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
