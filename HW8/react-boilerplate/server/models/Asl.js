const mongoose = require('mongoose');
const { OutputSchema } = require('./output');

const Schema = mongoose.Schema;

const AslSchema = new Schema({
    primary_class: { type: String},
    secondary_class: { type: String },
    tertiary_class: { type: String },
    feature_name: { type: String },
    asl_term_index_num: { type: String },
    output: { type: OutputSchema }
});

const Asl = mongoose.model('Asl', AslSchema);

module.exports = { AslSchema, Asl };