var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    academic_standing: { type: String },
    auth: { type: Boolean }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;