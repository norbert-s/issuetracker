const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const Joi = require('joi');
const router = express.Router();
const expect = require('chai').expect;
require('dotenv').config();

const {updateOne} = require('../helpers/joiSchema.js');
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
    // console.log('status'+statusItt);
    // console.log('status'+statusItt);
    function findQueryCreator(myObj){
        let newObj = myObj;
        for(let i in newObj){
            // console.log(`ez az iiiiiiii${i}: ${newObj[i]}`);
            if(newObj[i]==undefined || newObj[i]=='' || newObj[i]==null){
                delete newObj[i];
            }
        }
        return newObj;
    }
    let objektum ={title:iTitle,text:iText,created_by:createdBy,
        assigned_to:assignedTo,status_text:statusText,update_on:Date.now()};

    // console.log(`${iText}  ${iTitle} ${createdBy}`);
    let joiUpdate = updateOne.validate({
        id:id
    });
    if(joiUpdate.error)res.send(joiUpdate.error.message);
    else{
        MyIssue.findById({_id:id}).exec(async function(err,myIssue) {
            // console.log('myissue elotte'+myIssue);
            if(myIssue==undefined) res.send('id cannot be found in the database');
            else{
                let myNewObj = findQueryCreator(objektum);
                // console.log('myNewObj');
                // console.log(myNewObj);
                for (let i in myNewObj) {
                    // console.log('i');
                    // console.log(myIssue[i]);
                    myIssue[i]=myNewObj[i];
                }
                if(statusItt==false){
                    myIssue.status=false;
                }
                else myIssue.status=true;
                // myIssue.update_on=Date.now();
                // console.log('statuszka'+myIssue.status);
                await myIssue.save((err,doc)=>{
                    if(err) res.send(err);
                    // else console.log(doc);
                });
                await MyIssue.findById({_id:id},async function(err,doc){
                    if(err) res.send(err);
                    else{
                        let str = `<div id="jsonResult" class="jsonClass"><strong>result</strong>: Successfully updated<br>
                    <strong>status</strong>: ${doc.status}<br>
                    <strong>id</strong>: ${doc._id}<br>
                    <strong>title</strong>: ${doc.title}<br>
                    <strong>text</strong>: ${doc.text}<br>
                    <strong>created_by</strong>: ${doc.created_by}<br>
                    <strong>assigned_to</strong>: ${doc.assigned_to}<br>
                    <strong>status_text</strong>: ${doc.status_text}<br>
                    <strong>created_on</strong>: ${doc.created_on}<br>
                    <strong>updated_on</strong>: ${doc.update_on}</div>`;
                        await res.send(str);
                    }
                });
            }
        })
    }

});
module.exports = updateIssue;