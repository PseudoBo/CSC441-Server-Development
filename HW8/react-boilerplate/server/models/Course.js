const mongoose = require('mongoose');
const { AssignmentSchema } = require('./Assignment');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_name: { type: String },
    instructor_name: { type: String },
    credit_hours: { type: Number },
    assignments: { type: [AssignmentSchema] }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = { CourseSchema, Course };