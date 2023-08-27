const express = require("express");

const {
  addStudent,
  update,
  editStudent,
  create,
  destroy,

} = require("../controller/studentController");
const router = express.Router();

// rending add  Student page
router.get("/add-student", addStudent);

// updating the student
router.post("/update/:id", update);

// rendering edit page
router.get("/edit-student/:id", editStudent);

// creating a new Student
router.post("/create", create);

// deleting a particular student
router.get("/destroy/:studentId", destroy);
// router.get('/download',reportController.downloadCSVReport);


module.exports = router;