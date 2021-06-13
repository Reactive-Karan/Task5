import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            React-Task
          </Link>
          <Link
            className="btn btn-outline-success"
            aria-current="page"
            to="/users/CreateProfile"
          >
            Create New Profile
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
