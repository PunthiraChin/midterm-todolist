import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  /// เดี๋ยวเอาไปไว้ที่ context API
  const [user, setUser] = useState(null);
  const handleInputEmailOrMobile = (event) => {
    setEmailOrMobile(event.target.value);
  };
  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    let loginData = { email: emailOrMobile, password: password };
    // let response = await login(loginData)
    let response = await loginApi(loginData);
    console.log(response.data);
    setUser(response.data);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div>Welcome</div>
      <form>
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
        <button type="submit" onClick={handleSubmitLogin}>
          LOG IN
        </button>
      </form>
    </div>
  );
}
