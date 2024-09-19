import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
function EmployeeList() {
  const [employeeRecord, setEmployeeRecord] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8081/employeelist");
        setEmployeeRecord(res.data);
      } catch (error) {
        console.log(res);
      }
    };
    getData();
  }, []);
  const [query, setQuery] = useState("");

  let filterData = [...employeeRecord];

  filterData = employeeRecord.filter(
    (emp) =>
      emp.name.toLowerCase().includes(query.toLowerCase()) ||
      emp.designation.toLowerCase().includes(query.toLowerCase()) ||
      emp.course.toLowerCase().includes(query.toLowerCase())
  );

  const handleDeleteRecord = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (isConfirm) {
      try {
        const response = await axios.delete(
          `http://localhost:8081/employee/${id}`
        );
        if (response.status === 200) {
          setEmployeeRecord((prev) => prev.filter((emp) => emp._id !== id));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-5">
      <h1 className="title bg-yellow-300 px-6">Employee List</h1>
      <div className="flex items-center justify-end gap-7 border p-3">
        <div>Total Count:{employeeRecord.length}</div>
        <NavLink to="/admin/employeeform">
          <h1 className="create-button bg-green-300 px-2">Create Employee</h1>
        </NavLink>
      </div>
      <div className="flex items-center justify-end gap-2 bg-blue-300">
        <label htmlFor="">Search:</label>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          className="outline-none border px-2"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <table className="border border-t-0 text-sm text-left">
        <thead className="bg-blue-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Unique Id
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Mobile No
            </th>
            <th scope="col" className="px-6 py-3">
              Designation
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Course
            </th>
            <th scope="col" className="px-6 py-3">
              Create Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((employee, index) => (
            <tr key={employee.id}>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {index + 1}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                <img src={employee.img_url} alt="" />
              </td>
              {/* Placeholder for image */}
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {employee.name}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                <a href={`mailto:${employee.email}`}>{employee.email}</a>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {employee.mobile}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {employee.designation}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {employee.gender}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {employee.course}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {new Date(employee.createdAt).toLocaleDateString()}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                <button className="bg-green-300 px-1">Edit</button>{" "}
                <button
                  className="bg-red-500 px-1"
                  onClick={() => handleDeleteRecord(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
