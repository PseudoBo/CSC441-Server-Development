const mongoose = require('mongoose');
const { CourseSchema } = require('./Course');
const Schema = mongoose.Schema;

const SchoolOfSchema = new Schema({
    school_name: { type: String },
    major_name: { type: String },
    minor_name: { type: String },
    courses: { type: [CourseSchema] }
});

const SchoolOf = mongoose.model('SchoolOf', SchoolOfSchema);

module.exports = { SchoolOfSchema, SchoolOf };