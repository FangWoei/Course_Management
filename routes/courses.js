const express = require("express");
const router = express.Router();

// instruction: import the course model

const Courses = require("../models/course");

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/

router.get("/", async (req, res) => {
  try {
    const courses = await Courses.find().populate("instructor");
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ message: "Courses not found" });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)
router.get("/:id", async (req, res) => {
  try {
    const data = await Courses.findOne({ _id: req.params.id }).populate(
      "instructor"
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Courses not found" });
  }
});

// instruction: setup POST /: Add a new course
router.post("/", async (req, res) => {
  try {
    const newCourses = new Courses({
      title: req.body.title,
      instructor: req.body.instructor,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      subject: req.body.subject,
      description: req.body.description,
      enrollmentCount: req.body.enrollmentCount,
    });

    await newCourses.save();
    res.status(200).send(newCourses);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id
router.put("/:id", async (req, res) => {
  try {
    const c_id = req.params.id;

    const updatedCo = await Courses.findByIdAndUpdate(c_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedCo);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`

router.delete("/:id", async (req, res) => {
  try {
    const c_id = req.params.id;

    const deleteCo = await Courses.findByIdAndDelete(c_id);
    res.status(200).send(deleteCo);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: export the router

module.exports = router;
