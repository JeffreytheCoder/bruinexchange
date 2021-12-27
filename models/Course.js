const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  lec: {
    type: String,
  },
  disc: {
    type: String,
  },
});

module.exports = mongoose.model('course', CourseSchema);
