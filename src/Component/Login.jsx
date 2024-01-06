// Login.js
import React, { useState } from "react";
import axios from "axios";
import Userlist from "./Userlist";
import { useNavigate } from "react-router-dom";
import { setAuthenticationStatus } from "./Authstatus";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost/reactcrudphp/api/auth.php/",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        // Handle successful login (you might want to redirect or perform other actions)
        console.log("Login successful");
        setAuthenticationStatus(true); 
        setTimeout(() => {
          navigate("/adduser");
        }, 2000);
      } else {
        // Handle failed login
       
        setError(response.data.error || "Login failed");
        setAuthenticationStatus(false); 
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login");
      setAuthenticationStatus(false);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      <footer className="bg-dark text-light mt-3 mb-3 py-5">
     
      <div className="d-flex justify-content-center">
        <Userlist />
      </div>
    </footer>
    </>
  );
};


export default Login;
