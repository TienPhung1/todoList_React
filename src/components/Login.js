import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../services/UserService";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingAPI, setLoadingAPI] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/users");
    }
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email or Password is required");
      return;
    }

    setLoadingAPI(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/users");
    } else {
      if (res && res.status === 400) {
        //error
        toast.error(res.data.error);
      }
    }
    setLoadingAPI(false);
  };
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>
      <div className="text">Email or username ( eve.holt@reqres.in )</div>
      <input
        type="text"
        placeholder="Email or username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="input-2">
        <input
          type={isShowPassword === true ? "text" : "password"}
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={
            isShowPassword === true
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
      >
        {loadingAPI && <i className="fas fa-spinner fa-spin"></i>}
        &nbsp;Login
      </button>
      <div className="back">Go back</div>
    </div>
  );
};

export default Login;
