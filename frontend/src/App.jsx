import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/auth/Login";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AdminPage from "./components/pages/AdminPage";
import EmployeeForm from "./components/EmployeeForm";
import Home from "./components/pages/Home";
import UserLogin from "./components/auth/UserLogin";
import UserRegistration from "./components/auth/UserRegistration";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="register" element={<UserRegistration />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path="home" element={<Home />} />
            <Route path="employeelist" element={<EmployeeList />} />
            <Route path="employeeform" element={<EmployeeForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
