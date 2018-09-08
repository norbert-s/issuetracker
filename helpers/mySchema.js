const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title:  {type:String,maxlength:255},
    text: {type:String,maxlength:3000},

    created_by:{type:String,maxlength:255},

    assigned_to:{type:String,maxlength:50},
    status_text:{type:String,maxlength:50},
    status:{type:Boolean, default:true},
    created_on:{type:Date, default: Date.now},
    update_on:{type:Date}
} ,{ collection: 'issues' });

const MyIssue = mongoose.model('MyIssue', issueSchema);
//
 module.exports.MyIssue = MyIssue;
