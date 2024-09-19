const employeeModel = require("../models/employeeModel");

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course, img_url } =
      req.body;

    const isExist = await employeeModel.findOne({ email: email });
    console.log(isExist);
    if (isExist) {
      return res
        .status(200)
        .send({ success: false, message: "Employee Exist" });
    }

    const emp = employeeModel({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      img_url,
    });
    await emp.save();
    res.status(200).send({ success: true, message: "Employee Registered" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Registration Error", error });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.status(200).send(employees);
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const _id = req.params;
    const deleteRes = await employeeModel.findByIdAndDelete(_id);
    if (deleteRes) {
      res.status(200).send({ success: true, message: "Employee deleted" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

// module.exports = getEmployee;
