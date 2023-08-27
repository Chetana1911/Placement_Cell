const Interview = require("../models/interview");
const Student = require("../models/student");

module.exports.addStudent = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
  }
  return res.redirect("/");
};

module.exports.editStudent = async (req, res) => {

  const student = await Student.findByid(req.params.id);


  if (req.isAuthenticated()) {
    return res.render("edit_student", {
      title: "Edit Student",
      student_details: student,
    });

  }
  return res.redirect('/');
};

module.exports.create = async (req, res) => {
  try {
    const {
      name,
      email,
      batch,
      college,
      placementStatus,
      dsa_score,
      react_score,
      webdev_score,
    } = req.body;
    const student = await Student.findOne({ email: email });
    if (!student) {
      await Student.create(
        {
          name,
          email,
          college,
          batch,
          dsa_score,
          react_score,
          webdev_score,
          placementStatus,
        },
      )
      return res.redirect("back");


    } else {
      return res.redirect("back");

    }
  }
  catch (err) {
    console.log("Error in creating", err);
    return;
  }
}




module.exports.editStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (req.isAuthenticated()) {
    return res.render("edit_student", {
      title: "Edit Student",
      student_details: student,
    });
  }

  return res.redirect("/");
};



// Deletion of student
module.exports.destroy = async (req, res) => {

  try {
    const studentId = req.params.studentId;


    const student = await Student.findById(studentId);



    if (!student) {
      return;
    }


    const interviewsOfStudent = student.interviews;



    // delete reference of student from companies in which this student is enrolled
    if (interviewsOfStudent.length > 0) {


      for (let interview of interviewsOfStudent) {


        await Interview.findOneAndUpdate(

          { company: interview.company },
          { $pull: { students: { student: studentId } } }
        );
      }
    }

    // student.remove();


    await Student.findByIdAndDelete(student.id);


    return res.redirect("back");
  } catch (err) {
    console.log("error", err);
    return;
  }
};

// update student details
module.exports.update = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const {
      name,
      college,
      batch,
      dsa_score,
      react_score,
      webdev_score,
      placementStatus,
    } = req.body;

    if (!student) {
      return res.redirect("back");
    }

    student.name = name;
    student.college = college;
    student.batch = batch;
    student.dsa_score = dsa_score;
    student.react_score = react_score;
    student.webdev_score = webdev_score;
    student.placementStatus = placementStatus;

    student.save();
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};


