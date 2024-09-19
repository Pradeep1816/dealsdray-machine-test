import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    if (username === "admin" && password === "admin") {
      navigate("/admin");
    } else {
      alert("password Incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="w-[500px]  border h-[400px] p-5 flex items-center justify-center">
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-3">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="outline-none border"
              />
            </div>
            <div className="flex gap-3">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none border"
              />
            </div>
          </div>
          <div className="border mt-20 text-center">
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
