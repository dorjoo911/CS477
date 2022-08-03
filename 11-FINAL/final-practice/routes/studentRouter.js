const express = require("express");
const studentController = require("../controllers/studentController");

const router = express.Router();

router.get("/", studentController.allStudent);
router.get("/:id", studentController.getStudent);
router.post("/", studentController.saveStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);
router.get("/:cid", studentController.getByCourseID);

module.exports = router;
