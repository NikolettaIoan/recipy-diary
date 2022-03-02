import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useReducer, useEffect } from 'react';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    case 'TOGGLE_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    mode: false,
  });

  const changeMode = (mode) => {
    dispatch({ type: 'TOGGLE_MODE', payload: mode });
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
      unsub();
    });
  }, []);

  // console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, changeMode }}>
      {children}
    </AuthContext.Provider>
  );
};
