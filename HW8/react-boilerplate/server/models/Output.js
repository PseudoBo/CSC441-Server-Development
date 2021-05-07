var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const GradingSchema = new Schema({
    garde: { type: Number},
    grader: { type: String },
    date: { type: String },
    completing_group: { type: String }
});

const OutputSchema = new Schema({
    1: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    2: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    3: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    4: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    5: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    6: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    7: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    8: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    9: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    10: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    11: { left: { type: GradingSchema }, right: { type: GradingSchema }},
    12: { left: { type: GradingSchema }, right: { type: GradingSchema }},
});

var Output = mongoose.model('Output', OutputSchema);

module.exports = { OutputSchema, Output};