var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    output: {
        1: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        2: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        3: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        4: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        5: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        6: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        7: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        8: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        9: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        10: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        11: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        12: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        13: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
        14: { grade: { type: Number }, grader: { type: String }, date: { type: String }},
    }
});

var Data = mongoose.model('Data', DataSchema);

module.exports = Data;