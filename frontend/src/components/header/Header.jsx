import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function Header() {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user =
      localStorage.getItem("user") !== null &&
      JSON.parse(localStorage.getItem("user"));
    setLoginUser(user);
  }, []);

  const handleClear = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="py-3 border-b shadow-lg">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center justify-center gap-10">
          <div>Logo</div>
          <nav className="flex gap-5">
            <NavLink to="home">Home</NavLink>
            <NavLink to="employeelist">Employee List</NavLink>
          </nav>
        </div>

        <div>
          {loginUser ? (
            <div className="flex gap-2">
              <p>{loginUser.name}</p> <h2 onClick={handleClear}>logout</h2>
            </div>
          ) : (
            <NavLink to="/">
              <h2>Login</h2>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
