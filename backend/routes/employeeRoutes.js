const express = require("express");
const employeeController = require("../controllers/empController");
const router = express.Router();

router.post("/employee", employeeController.createEmployee);
router.get("/employeelist", employeeController.getEmployee);
router.delete("/employee/:_id", employeeController.delete);

module.exports = router;
