import './App.css';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Recipe from './pages/recipe/Recipe';
import Login from './pages/login/Login';
import SignIn from './pages/signin/SignIn';
import { useAuthContext } from './hooks/useAuthContext';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

function App() {
  // const [theme, setTheme] = useState(true);
  const { user, authIsReady, mode, changeMode } = useAuthContext();

  const toggleMode = () => {
    const newMode = mode ? false : true;

    changeMode(newMode);
  };

  return (
    <div className={`App ${mode && 'dark'}`}>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <button className="togglebutton" onClick={toggleMode}>
            {mode ? (
              <FaMoon className="togglebutton moon" />
            ) : (
              <BsSunFill className="togglebutton" />
            )}
          </button>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/recipe/:id"
              element={user ? <Recipe /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signin"
              element={!user ? <SignIn /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
