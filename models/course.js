const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const instructorSchema = require("./instructor");

/*
    instruction: setup the course schema according to the following requirements:
    - `title`: (String, required)
    - `instructor`: (ObjectId, ref: 'Instructor', required)
    - `startDate`: (Date)
    - `endDate`: (Date)
    - `subject`: (String)
    - `description`: (String)
    - `enrollmentCount`: (Number, default: 0) - The number of students enrolled
*/

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  subject: {
    type: String,
  },

  description: {
    type: String,
  },

  enrollmentCount: {
    type: Number,
    default: 0,
  },

  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
  },
});

const Courses = model("Courses", courseSchema);
module.exports = Courses;
