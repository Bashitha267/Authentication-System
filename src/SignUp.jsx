import axios from "axios";
import React, { useState } from "react";
import "./Signup.css";
export const SignUp = ({ setMenu }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "" || email === "") {
      setError(true);
      setSuccess(false);
      setMessage("*");
      return;
    }
    
    axios
      .get("http://localhost:3000/users/names/" + username)
      .then(function (response) {
        if (response.data.name && response.data) {
          setError("username-exists");
          setSuccess(false);
          setMessage("username already taken");
        }
      })
      .catch(function (error) {
        if (password !== confirmPassword) {
            setError("password-different");
            setSuccess(false);
            setMessage("password and confirm password should be same");
            return;
          }
        axios
          .post("http://localhost:3000/users", {
            name: username,
            email: email,
            password: password,
          })
          .then(function (response) {
            console.log("succcess");
            setSuccess(true);
            setError(false);
            setUsername("");
            setPassword("");
            setEmail("");
            setConfirmPassword("");
            
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div className="container shadow">
      <form class="row g-3 signup-form " onSubmit={handlesubmit}>
      <h3 className="font-bold text-3xl">Sign Up</h3>
        <div class="col-md-12">
          <label class="form-label">Username</label>
          <input
            type="text"
            class="form-control"
            id="username"
            onChange={handleUsername}
          />
           {error===true && (
  <div className="text-red-700 mb-0 text-sm" role="alert">
  {message}
  
</div>
)}
{error==="username-exists" && (
  <div className="text-red-700 mb-0 text-sm" role="alert">
  {message}
  
</div>
)}


        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control mt-0"
            id="email"
            onChange={handleEmail}
          />
          {error===true && (
  <div className="text-red-700 mb-0 text-sm" role="alert">
  {message}
</div>
)}
        </div>
        <div class="col-md-12">
          <label for="inputPassword4" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="Password"
            onChange={handlePassword}
          />
           {error===true && (
  <div className="text-red-700 mb-0 text-sm" role="alert">
  {message}
</div>
)}
        </div>
        <div class="col-md-12">
          <label for="inputPassword4" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="Password"
            onChange={handleConfirmPassword}
          />
           {error==="password-different" && (
  <div className="text-red-700 mb-0 text-sm"  role="alert">
  {message}
</div>
)}
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary" onClick={handlesubmit}>
            Sign Up
          </button>
          <button type="reset" class="btn btn-primary reset-btn">
            Reset
          </button>
          <h6 className="mt-2 text-sm">
        Do you already have an Account?{" "}
        <a
          href="#" className="text-blue-800 font-semibold text-base"
          onClick={() => {
            setMenu("sign_in");
          }}
        >
          Sign In
        </a>
      </h6>
      {success === true && (
        <div className="alert alert-success message p-2" role="alert">
          User Added Successfully
        </div>
      )}
      
        </div>
      </form>
      
      
      {/* <button onClick={() => setMenu("sign_in")}>Sign In</button> */}
    </div>
  );
};
export default SignUp;

