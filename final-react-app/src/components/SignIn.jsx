import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]); // Giữ nguyên dạng mảng để có thể lưu nhiều lỗi
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://api.realworld.io/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email, password } }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        // Handle errors
        const errorMessages = data.errors ? Object.entries(data.errors).map(([key, value]) => `${key} ${value}`) : ['Something went wrong.'];
        setErrors(errorMessages);
      } else {
        console.log("Login successful", data);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.user.token); // Lưu token vào localStorage
        
        navigate('/');
      }
    } catch (error) {
      console.error("Login error", error);
      setErrors([error.message]);
    }
  };
  

  return (
    <div>
      <Header />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <a href="/register">Need an account?</a>
              </p>
              
              {/* Display errors here if any */}
              {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleSignIn}>
                <fieldset className="form-group">
                  <input
                    name="email"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
