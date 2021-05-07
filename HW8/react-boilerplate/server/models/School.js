const mongoose = require('mongoose');
const { BlockSchema } = require('./Block');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    school: { type: String },
    year: { type: String },
    semester: { type: String },
    blocks: { type: [BlockSchema] }
});

const School = mongoose.model('School', SchoolSchema);

module.exports = { SchoolSchema, School };