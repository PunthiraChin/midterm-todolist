import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/authApi";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [validateEmailStatus, setValidateEmailStatus] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(false);
  const handleInputEmailOrMobile = (event) => {
    setEmailOrMobile(event.target.value);
    setSubmitStatus(false);
  };
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
    setSubmitStatus(false);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setSubmitStatus((prev) => true);
    let loginData = { email: emailOrMobile, password: password };
    // let response = await login(loginData)
    try {
      let response = await loginApi(loginData);
      // console.log(response.data);
      await setUser(response.data);
      // console.log(user);
      navigate("/");
    } catch (err) {
      setValidateEmailStatus((prev) => false);
      console.log("submit error", err);
    }
  };

  return (
    <div className="login-page">
      <div className="header">Welcome</div>
      <form onSubmit={handleSubmitLogin} className="loginform">
        <label htmlFor="emailOrMobile">emailOfMobile</label>
        <input
          type="text"
          id="emailOrMobile"
          name="emailOrMobile"
          value={emailOrMobile}
          onChange={handleInputEmailOrMobile}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={handleInputPassword}
        />
        {submitStatus === true && validateEmailStatus === false ? (
          <div className="errormessage">Invalid Email or Password</div>
        ) : null}
        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
}
