const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const expect = require('chai').expect;
const {deleteOne} = require('../helpers/joiSchema');
const {MyIssue} = require('../helpers/mySchema.js');

let deleteIssue=router.delete('/api/issues/apitest',async function (req, res){
    let id = req.body._id;
    console.log(id);
    deleteOne.validate({
        id:id
    });
    let dThis;
    try{
        await MyIssue.findOne({_id:id},async function(err,myIssue){
            dThis = myIssue;
            console.log('myissue'+myIssue);
            if(myIssue==undefined) res.send('Please enter a valid id!');
            if(err) res.send(err);
            else{
                await MyIssue.deleteOne({_id:id},async function(err,myIssue){
                    if(err) res.send('Something went wrong, try again');
                    else{
                        let str =
                            `<div class="jsonClass" id="jsonResult">
                    <strong>The id:</strong> ${dThis._id} and the record below has been successfully deleted.<br>
                    <strong>status</strong>: ${dThis.status}<br>
                    <strong>id</strong>: ${dThis._id}<br>
                    <strong>title</strong>: ${dThis.title}<br>
                    <strong>text</strong>: ${dThis.text}<br>
                    <strong>created_by</strong>: ${dThis.created_by}<br>
                    <strong>assigned_to</strong>: ${dThis.assigned_to}<br>
                    <strong>status_text</strong>: ${dThis.status_text}<br>
                    <strong>created_on</strong>: ${dThis.created_on}<br>
                    <strong>updated_on</strong>: ${dThis.update_on}</div>`;
                        // console.log(myIssue);
                        res.send(str);

                    }
                })
            }
        })
    }
    catch(ex){
     res.status;
            }

});
module.exports = deleteIssue;