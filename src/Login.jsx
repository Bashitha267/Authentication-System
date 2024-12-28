import axios from "axios";
import bcrypt from 'bcryptjs';
import React, { useState } from "react";
import "./login.css";
export const Login = ({setMenu}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [fails, setFails] = useState("");
  const [message, setMessage] = useState("");

  const setusername = (e) => {
    setUsername(e.target.value);
  };
  const setpassword = (e) => {
    setPassword(e.target.value);
  };
  const reset_form = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setSuccess("");
    setFails("");
  };
  const verifyPassword = async (plainTextPassword, hashedPassword) => {
    try {
      const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
      return isMatch;
    } catch (err) {
      console.error('Error verifying password:', err);
      throw err;
    }
  };

  const submit_form =  async(e) => {
    e.preventDefault();
    if(password==="" && username===""){
      setFails("incomplete-data");
      setSuccess(false);
      setMessage("*required")
      return;
    }
    if (username === "") {
     setFails("incomplete-data-username");
     setSuccess(false);
     setMessage("*required")
      return;
    }
    if(password===""){
      setFails("incomplete-data-password");
      setSuccess(false);
      setMessage("*required")
      return;
    }
    
    axios
      .get("http://localhost:3000/users/names/" + username)
      .then(async (res) => {
        if (res.data && res.data.name) {
          const UserPassword = res.data.password;  
          const isMatched= await verifyPassword(password,UserPassword);
          if(isMatched==true){
            console.log("username and Password Matched");
            setSuccess(true);
            setFails(false);
            setMenu("login_success")
          
          } else {
            console.log("password doesnt match with username");
            setFails(true);
            setSuccess(false);
            setMessage("password is incorrect");
          }
        } else {
          console.log("User  not found");
          setFails(true);
          setSuccess(false);
          setMessage("username not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
   
      <div className="body">  
      <form className="login-form log-form bg-white bg-opacity-100" onSubmit={submit_form}>
        <h3 className="text-center first-letter:capitalize text-3xl font-bold mb-3">Sign In</h3>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={setusername}
          ></input>
          {fails ==="incomplete-data-username"&& (
          <div className="text-red-700 text-sm" >
            {message}
          </div>
          
        )}
         {fails ==="incomplete-data"&& (
          <div className="text-red-700 text-sm" >
            {message}
          </div>
          
        )}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={setpassword}
          ></input>
               {fails ==="incomplete-data-password"&& (
          <div className="text-red-700 text-sm" >
            {message}
          </div>
        )}
         {fails ==="incomplete-data"&& (
          <div className="text-red-700 text-sm" >
            {message}
          </div>
        )}
        {fails===true&&(
          <div className="text-red-700 text-sm" >
            {message}
            </div>
        )}
        </div>
        <div className="bottons">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submit_form}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-primary reset-btn"
            onClick={reset_form}
          >
            Reset
          </button>
          <h6 className="sign_upmsg mt-2">Don't have an account? <a href="#" className="text-blue-700 text-lg font-semibold" onClick={()=>{
           setMenu('sign_up') ;
          }}>Sign Up</a></h6>
        </div>
        {success === true && (
          <div className="alert alert-success message" role="alert">
            Login Success
            
          </div>
          
        )}
        
      </form>
      </div>
     
      
    
  );
};
export default Login;
