import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateProfile = () => {
  const [errors, setErrors] = useState({});
  const validation = (user) => {
    let errors = {};
    if (!user.fname) {
      errors.fname = "First Name is required.";
    }
    if (!user.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email is invalid";
    }
    if (!user.lname) {
      errors.lname = "Last Name is required.";
    }
    if (!user.Status) {
      errors.Status = "Please provide current status.";
    }

    return errors;
  };

  let history = useHistory();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    Status: "",
  });

  const InputOnchange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user.fname || !user.lname || !user.email || !user.Status) {
      setErrors(validation(user));
    } else {
      await axios.post("http://localhost:3002/users", user);
      history.push("/");
    }
  };

  return (
    <div className="container">
      <div className="py-4 ">
        <form className="w-50 m-auto" onSubmit={(e) => onSubmit(e)}>
          <h1>Create New Account</h1>
          <div class="mb-3">
            <label for="fnamer" class="form-label">
              First Name
            </label>
            <input
              type="text"
              name="fname"
              class="form-control"
              id="fnamer"
              value={user.fname}
              onChange={InputOnchange}
            />
            {errors.fname && (
              <p className="error text-danger">{errors.fname}</p>
            )}
          </div>
          <div class="mb-3">
            <label for="lnamer" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="lname"
              class="form-control"
              id="lnamer"
              value={user.lname}
              onChange={InputOnchange}
            />
            {errors.lname && (
              <p className="error text-danger">{errors.lname}</p>
            )}
          </div>
          <div class="mb-3">
            <label for="InputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="InputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={user.email}
              onChange={InputOnchange}
            />
            {errors.email && (
              <p className="error text-danger">{errors.email}</p>
            )}
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <select
            name="Status"
            class="form-select mb-3"
            aria-label="Default select example"
            onChange={InputOnchange}
            value={user.Status}
          >
            <option selected>Choose your current status</option>
            <option value="Currently-Interviewed">Currently-Interviewed</option>
            <option value="Employed">Employed</option>
            <option value="Trainee">Trainee</option>
            <option value="Ex-Employee">Ex-Employee</option>
          </select>
          {errors.Status && (
            <p className="error text-danger">{errors.Status}</p>
          )}

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
