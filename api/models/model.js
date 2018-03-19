'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    fname: String,
    lname: String,
    sex: String,
    age: Number,
    course: String,
    matric: String,
    desc: String
});

module.exports = mongoose.model('Student', studentSchema);