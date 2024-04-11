import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import Header from "./Header";
import Footer from "./Footer";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.realworld.io/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { username, email, password },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors(Object.entries(data.errors || {}).map(([key, value]) => `${key} ${value}`));
        console.error(data.errors);
      } else {
        console.log("Registration successful", data);
        navigate('/login'); // Use navigate('/') to redirect to login page
      }
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div>
      <Header/>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <a href="/login">Have an account?</a>
              </p>
              <ul className="error-messages">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <form onSubmit={handleSignUp}>
                <fieldset className="form-group">
                  <input
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="email"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
                  <Footer/>
    </div>
  );
};

export default SignUp;
