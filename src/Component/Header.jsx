import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            CommentHandlerApp
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/userlist" className="nav-link">
                  UserCommentList
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/experince" className="nav-link">
                  Experience
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/adduser" className="nav-link">
                  AddComments
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              {/* Place your login and logout buttons here */}
             < NavLink to="/login" className="nav-link">
              <button   className="btn btn-outline-success me-2" type="button">

                Login
              </button>
                </NavLink>
                < NavLink to="/logout" className="nav-link">
              <button className="btn btn-outline-danger" type="button">
                Logout
              </button>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
export default Header;
