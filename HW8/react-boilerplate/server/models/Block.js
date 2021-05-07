const mongoose = require('mongoose');
const { SessionSchema } = require('./Session');
const Schema = mongoose.Schema;

const BlockSchema = new Schema({
    block_id: { type: String },
    block_name: { type: String },
    sessions: { type: [SessionSchema] }
});

const Block = mongoose.model('Block', BlockSchema);

module.exports = { BlockSchema, Block };