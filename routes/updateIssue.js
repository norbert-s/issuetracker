const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Joi = require('joi');
const router = express.Router();
const expect = require('chai').expect;
require('dotenv').config();

const {updateOne} = require('../helpers/joiSchema');
const {MyIssue} = require('../helpers/mySchema.js');

let updateIssue= router.put('/api/issues/apitest',function(req,res){
    let body = req.body;
    let iTitle = body.issue_title,
        iText = body.issue_text,
        createdBy = body.created_by,
        assignedTo = body.assigned_to,
        statusText = body.status_text,
        id= body._id,
        statusItt;
    if(body.open==undefined){
        statusItt = true;
    }
    else
        statusItt=false;
    console.log('status'+statusItt);
    let myObj ={status:statusItt,title:iTitle,text:iText,created_by:createdBy,
        assigned_to:assignedTo,status_text:statusText};

    console.log(`${iText}  ${iTitle} ${createdBy}`);
    let joiUpdate = updateOne.validate({
        id:id
    });
    MyIssue.findById({_id:id}).exec(async function(err,myIssue) {
        // console.log('myissue elotte'+myIssue);
        if(myIssue==undefined) await res.send('this id cannot be found in the database');
        else{
            for (let i in myObj) {
                if (myObj[i] == '' || myObj[i] == undefined ||myObj[i]==null) {
                    console.log('null itt');
                }
                else{
                    console.log('obj val'+ myObj[i]);
                    myIssue[i]=myObj[i];
                }
            }
            if(statusItt==false){
                myIssue.status=false;
            }
            else myIssue.status=true;
            myIssue.update_on=Date.now();
            console.log('statuszka'+myIssue.status);
            await myIssue.save((err,doc)=>{
                if(err) res.send(err);
                else console.log('doc'+doc);
            });
            await MyIssue.findById({_id:id},async function(err,doc){
                if(err) res.send(err);
                else{
                    let str = `<div id="jsonResult" class="jsonClass"><strong>result</strong>: Successfully updated<br>
                    <strong>status</strong>: ${doc.status}<br>
                    <strong>id</strong>: ${doc._id}<br>
                    <strong>title</strong>: ${iTitle}<br>
                    <strong>text</strong>: ${iText}<br>
                    <strong>created_by</strong>: ${createdBy}<br>
                    <strong>assigned_to</strong>: ${assignedTo}<br>
                    <strong>status_text</strong>: ${statusText}<br>
                    <strong>created_on</strong>: ${doc.created_on}<br>
                    <strong>updated_on</strong>: ${doc.update_on}</div>`;
                    await res.send(str);
                }

            });
        }
    })
});
module.exports = updateIssue;