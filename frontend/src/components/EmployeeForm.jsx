import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EmployeeForm = () => {
  const navigate = useNavigate();
  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    img_url: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpData({
      ...empData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images_preset");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      if (res.status === 200) {
        setEmpData({
          ...empData,
          img_url: res.data.secure_url,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // setEmpData({
  //   ...empData,
  //   image: file,
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add validation logic and submit the form here
    try {
      const res = await axios.post("http://localhost:8081/employee", empData);
      if (res.status === 200) {
        navigate("/admin/employeelist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border flex items-center justify-center h-[100vh]">
      <div className="border h-[70vh] rounded-lg bg-gray-50">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
          <div className="flex items-center justify-between">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={empData.name}
              onChange={handleChange}
              required
              className="border outline-none w-[350px] px-2"
            />
          </div>
          <div className="flex items-center justify-between ">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={empData.email}
              onChange={handleChange}
              required
              className="border outline-none w-[350px] px-2"
            />
          </div>
          <div className="flex items-center justify-between gap-10">
            <label>Mobile No: </label>
            <input
              type="tel"
              name="mobile"
              value={empData.mobile}
              onChange={handleChange}
              required
              className="border outline-none w-[350px] px-2"
              pattern="[0-9]{10}" // for numeric validation
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Designation: </label>
            <select
              name="designation"
              value={empData.designation}
              onChange={handleChange}
              className="border outline-none w-[350px]"
              required
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label>Gender: </label>
            <div className="w-[350px] flex gap-2">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  onChange={handleChange}
                  required
                />
                Female
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label>Course: </label>
            <div className="w-[350px] flex gap-3">
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="MCA"
                  onChange={handleChange}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BCA"
                  onChange={handleChange}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  name="course"
                  value="BSC"
                  onChange={handleChange}
                />
                BSC
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label>Image Upload: </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept=".jpg,.png"
              className="border outline-none w-[350px]"
              required
            />
          </div>
          <button
            type="submit"
            style={{ backgroundColor: "lightgreen", padding: "10px 20px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
