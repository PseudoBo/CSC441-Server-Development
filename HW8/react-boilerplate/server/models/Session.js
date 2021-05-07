const mongoose = require('mongoose');
const { AslSchema } = require('./Asl');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    labdate: { type: String },
    labtopic: { type: String },
    group: { type: String },
    asl_seq_num: { type: String },
    session_seq_num: { type: String },
    asls: { type: [AslSchema] }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = { SessionSchema, Session };