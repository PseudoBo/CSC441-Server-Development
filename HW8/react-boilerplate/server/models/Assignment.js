const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
    title: { type: String },
    description: { type: String },
    assigned_date: { type: String },
    due_date: { type: String },
    late_due_date: { type: String },
    max_points: { type: Number }
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = { AssignmentSchema, Assignment };