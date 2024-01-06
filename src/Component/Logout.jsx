// Logout.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {logout} from './Authstatus';
const Logout = () => {
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost/reactcrudphp/api/auth.php/', { logout: true });
      if (response.data.success) {
        // Handle successful logout
        console.log('Logout successful');
        logout();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Handle failed logout
        console.error('Logout failed');
        
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="container mt-5">
    <div className="card p-4 text-center">
      <h2>User can Logout by clicking the button</h2>
      <hr className="my-4" />
      <div className="d-grid">
        <button className="btn btn-danger btn-lg" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </div>
  );
};

export default Logout;
