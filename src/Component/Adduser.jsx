import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {getAuthenticationStatus} from './Authstatus'
function AddUser() {
  const navigate = useNavigate();
  const loggedIn = getAuthenticationStatus();
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    status: "",
  });
  const [message, setMessage] = useState("");
  //const [loggedIn, setLoggedIn] = useState("false"); // Track user login status
// used the login logout components status
  // useEffect(() => {
   
  //   // const checkLoginStatus = async () => {
  //   //   try {
  //   //     const response = await axios.get(
  //   //       "http://localhost/reactcrudphp/api/auth.php",
        
  //   //     );
  //   //   //  setLoggedIn(response.data.loggedIn);
  //   //     console.log(loggedIn);
  //   //   } catch (error) {
  //   //     console.error("Error checking login status:", error);
  //   //   }
  //   // };

  //   checkLoginStatus();
  // }, []);

  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedIn) {
      setMessage("Please log in to leave a comment.");
      return;
    }

    const formData = {
      username: formValue.username,
      email: formValue.email,
      status: formValue.status,
    };

    try {
      const res = await axios.post(
        "http://localhost/reactcrudphp/api/user.php",
        formData
      );

      if (res.data.success) {
        setMessage(res.data.success);
        setTimeout(() => {
          navigate("/userlist");
        }, 2000);
      } else {
        setMessage("Comment submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-2">
          <h5 className="mb-4">Add User Comment</h5>
          <p className="text-success">{message}</p>

          {/* Display the form only if the user is logged in */}
          {loggedIn ? (
            <form onSubmit={handleSubmit}>
              {/* Form fields... */}
              <div className="mb-2 row">
                <label className="col-sm-2">Username</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="username"
                    value={formValue.username}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="mb-2 row">
                <label className="col-sm-2">Email</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="email"
                    value={formValue.email}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="mb-2 row">
                <label className="col-sm-2">comment</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="status"
                    className="form-control"
                    value={formValue.status}
                    onChange={handleInput}
                  />
                  
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2"></label>
                <div className="col-sm-10">
                  <button name="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
         ) : (
            <p>Please log in to leave a comment.</p>
          )} 
        </div>
      </div>
    </div>
  );
}

export default AddUser;



