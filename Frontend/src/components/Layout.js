import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import logo from './logo.png';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="JobConnect Logo" className="h-8 w-8 mr-2" />
            <span className="text-2xl font-bold">JobConnect</span>
          </Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><Link to="/jobs" className="hover:underline">Jobs</Link></li>
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/support" className="hover:underline">Support</Link></li>
              {isAuthenticated ? (
                <>
                  <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
                  <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                  <li>
                    <Button onClick={handleLogout} variant="outline" className="py-1 px-2 text-sm">
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <li><Link to="/" className="hover:underline">Login</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">
          © 2023 JobConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;