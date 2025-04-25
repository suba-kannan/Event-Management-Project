import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginSignup from './LoginSignup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
  }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSignIn = () => {
        setIsLoggedIn(true);
        setShowModal(false);
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 2000);
    };

    const handleLogout = () => {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
  };

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleProtectedClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, _path: string) => {
      if (!isLoggedIn) {
        e.preventDefault();
        toast.error('You need to login');
      } else {
        setIsMobileMenuOpen(false);
      }
    };

  return (
    <>
      <nav className="navbar">
        <div className="left-block">
          <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <div className="logo">EVENT PLANPAL</div>
          <div className="separator" />

          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/feature" onClick={() => setIsMobileMenuOpen(false)}>Features</Link></li>
            <li><Link to="/explore" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link></li>
            <li>
              <Link to="/dashboard" onClick={(e) => handleProtectedClick(e, '/dashboard')}>Dashboard</Link>
            </li>
            <li>
              <Link to="/profile" onClick={(e) => handleProtectedClick(e, '/profile')}>Profile</Link>
            </li>
            {isMobileView && (
              <li className="sign-in-mobile">
                <button className="sign-in-btn" onClick={openModal}>Sign Up</button>
              </li>
            )}
          </ul>
        </div>
        {showWelcome && (
        <div className="navbar-welcome-popup">
          <p>Welcome back! 🎉</p>
        </div>
      )} 

        {!isMobileView && (
          <div className="nav-actions">
          {isLoggedIn ? (
              <button className="sign-in-btn" onClick={handleLogout}>Logout</button>
          ) : (
              <button className="sign-in-btn" onClick={openModal}>Sign Up</button>
          )}
      </div>
        )}
        {showModal && (
        <LoginSignup onClose={closeModal} onSignIn={handleSignIn} />
      )}
      </nav>
      <ToastContainer position="top-center" autoClose={2000} />

    </>
  );
}

export default Navbar;