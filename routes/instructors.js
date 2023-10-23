const express = require("express");
const router = express.Router();

// instruction: import the book model

const Instructor = require("../models/instructor");

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    const instructor = await Instructor.find();
    res.status(200).send(instructor);
  } catch (error) {
    res.status(400).send({ message: "Instructor not found" });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id
router.get("/:id", async (req, res) => {
  try {
    const data = await Instructor.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Instructor not found" });
  }
});

// instruction: setup POST /: Add a new instructor
router.post("/", async (req, res) => {
  try {
    const newInstructor = new Instructor({
      name: req.body.name,
      qualification: req.body.qualification,
      profile: req.body.profile,
      coursesTaught: req.body.coursesTaught,
    });

    await newInstructor.save();
    res.status(200).send(newInstructor);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});
// instruction: setup PUT /:id: Update a instructor by its _id
router.put("/:id", async (req, res) => {
  try {
    const i_id = req.params.id;

    const updatedI = await Instructor.findByIdAndUpdate(i_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedI);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});
// instruction: setup DELETE /:id: Delete a instructor by its _id

router.delete("/:id", async (req, res) => {
  try {
    const i_id = req.params.id;

    const deleteI = await Instructor.findByIdAndDelete(i_id);
    res.status(200).send(deleteI);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// instruction: export the router
module.exports = router;
