const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title:  {type:String,required:true,minlength:5,maxlength:255},
    text: {type:String,required:true,minlength:5,maxlength:255},

    created_by:{type:String,required:true,minlength:5,maxlength:255},

    assigned_to:{type:String,maxlength:35},
    status_text:{type:String,maxlength:50},
    status:{type:Boolean, default:true},
    date:{type:Date, default: Date.now}
} ,{ collection: 'issues' });

const MyIssue = mongoose.model('MyIssue', issueSchema);
//
 module.exports.MyIssue = MyIssue;
