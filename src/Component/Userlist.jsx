import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

function Userlist() {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUserData();
  }, []);
  
  useEffect(() => {
    getUserData();
  }, [window.location.pathname]);

  const getUserData = async () => {
    try {
      const reqData = await fetch("http://localhost/reactcrudphp/api/user.php");
      const resData = await reqData.json();
      setUserData(resData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (id, index) => {
    try {
      const res = await axios.delete(
        `http://localhost/reactcrudphp/api/user.php/${id}`
      );
      setMessage(res.data.success);

      // Update the comment status in the local state
      setUserData((prevData) => {
        const newData = [...prevData];
        newData[index].status = " This comment was deleted ❌";
        return newData;
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user");
    }
  };

const handleLike = async (id, index) => {
  try {
    const res = await axios.post(
      "http://localhost/reactcrudphp/api/user.php",
      { id: parseInt(id), type: "up" }
    );

    if (res.data.success) {
      // Fetch updated data from the backend
      const updatedUserData = await fetch(`http://localhost/reactcrudphp/api/user.php/${id}`);
      const updatedUser = await updatedUserData.json();

      // Update the state with the latest data
      setUserData((prevData) => {
        const newData = [...prevData];
        newData[index] = { ...newData[index], ...updatedUser };
        return newData;
      });

      setMessage(res.data.success);
    } else {
      setMessage(res.data.error || "Failed to record thumbs up");
    }
  } catch (error) {
    console.error("Error recording thumbs up:", error);
    setMessage("Error recording thumbs up");
  }
};

const handleDislike = async (id, index) => {
  try {
    const res = await axios.post(
      "http://localhost/reactcrudphp/api/user.php",
      { id: parseInt(id), type: "down" }
    );

    if (res.data.success) {
      // Fetch updated data from the backend
      const updatedUserData = await fetch(`http://localhost/reactcrudphp/api/user.php/${id}`);
      const updatedUser = await updatedUserData.json();

      // Update the state with the latest data
      setUserData((prevData) => {
        const newData = [...prevData];
        newData[index] = { ...newData[index], ...updatedUser };
        return newData;
      });

      setMessage(res.data.success);
    } else {
      setMessage(res.data.error || "Failed to record thumbs down");
    }
  } catch (error) {
    console.error("Error recording thumbs down:", error);
    setMessage("Error recording thumbs down");
  }
};



  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-4">
            <h5 className="mb-4">User Comment List</h5>
            <p className="text-danger">{message}</p>
            {Array.isArray(userData) && userData.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Likes</th>
                    <th scope="col">Dislikes</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((uData, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{uData.username}</td>
                      <td>{uData.email}</td>
                      <td>{uData.status}</td>
                      <td>{uData.thumbs_up|| 0}</td>
                      <td>{uData.thumbs_down ||0}</td>
                      <td>
                        <FaThumbsUp
                          className="  mx-2"
                          onClick={() => handleLike(uData.id, index)}
                          style={{ cursor: "pointer", color: "green" }}
                        />
                        <FaThumbsDown
                          className="mx-2"
                          onClick={() => handleDislike(uData.id, index)}
                          style={{ cursor: "pointer", color: "red" }}
                        />
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(uData.id, index)}
                        >
                          Delete
                        </button>
                        <Link
                          to={"/edituser/" + uData.id}
                          className="btn btn-success mx-2"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users comment available.</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Userlist;
