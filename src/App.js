import logo from './logo.svg';
import SideDrawer from './views/widgets/sidebar/sidebar';
import Home from './views/screens/home/home'
import Reports from './views/screens/reports/reports';
import About from './views/screens/about/about'
import LoginPage from './views/screens/auth/login'
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from './theme';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by reading from local storage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle user login
  const handleLogin = () => {
    // Perform login logic and set isLoggedIn to true
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/';
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic and set isLoggedIn to false
    setIsLoggedIn(false);

    localStorage.removeItem('isLoggedIn');
  };
  return (
    <div className="App">
      <ThemeProvider>
        <NextUIProvider>
          <Router>
            {isLoggedIn ? (
              <>
                <SideDrawer onLogout={handleLogout} />
                <div className="h-screen"> 
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </div>
              </>
            ) : (
              <LoginPage handleLog={handleLogin} />
            )}
          </Router>
        </NextUIProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;