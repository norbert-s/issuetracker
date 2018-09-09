const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const expect = require('chai').expect;
const {deleteOne} = require('../helpers/joiSchema');
const {MyIssue} = require('../helpers/mySchema.js');

let deleteIssue=router.delete('/api/issues/apitest',function (req, res){
    let id = req.body._id;
    console.log(id);
    deleteOne.validate({
        id:id
    });
    MyIssue.findOne({_id:id},function(err,myIssue){
        console.log('myissue'+myIssue);
        if(myIssue==undefined) res.send('the id that you are trying to delete is not in the database');
        else{
            MyIssue.deleteOne({_id:id},function(err,myIssue){
                if(err) res.send('Something went wrong, try again');
                else{
                    res.send('the record linked to id : '+id+' has been successfully deleted');
                }
            })
        }
    })
});
module.exports = deleteIssue;