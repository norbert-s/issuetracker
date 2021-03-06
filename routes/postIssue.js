const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const expect = require('chai').expect;
const {postOne} = require('../helpers/joiSchema');
const {MyIssue} = require('../helpers/mySchema.js');

let postIssue = router.post('/api/issues/apitest',async function (req,res){
        let body = req.body;
        let iTitle = body.issue_title,
            iText = body.issue_text,
            createdBy = body.created_by,
            assignedTo = body.assigned_to,
            statusText = body.status_text,
            status = true;
        // console.log(`${iText}  ${iTitle} ${createdBy}`);
        let joiVal = postOne.validate({
            title: iTitle,
            text: iText,
            created_by: createdBy
        });
        if (joiVal.error) res.send(joiVal.error.message);
        else {
            // console.log('user call');
            let myIssue = new MyIssue({
                title: iTitle,
                text: iText,
                created_by: createdBy,
                assigned_to: assignedTo,
                status_text: statusText,
                status: status
            });
            // console.log('kollekcio :');
            try {
                await myIssue.save((err, doc) => {
                    if (err) return res.send(err);
                    else {
                        let str = `<div id="jsonResult" class="jsonClass"><strong>result</strong>: Successfully created<br>
                    <strong>status</strong>: ${doc.status}<br>
                    <strong>id</strong>: ${doc._id}<br>
                    <strong>title</strong>: ${doc.title}<br>
                    <strong>text</strong>: ${doc.text}<br>
                    <strong>created_by</strong>: ${doc.created_by}<br>
                    <strong>assigned_to</strong>: ${doc.assigned_to}<br>
                    <strong>status_text</strong>: ${doc.status_text}<br>
                    <strong>created_on</strong>: ${doc.created_on}<br>
                    <strong>updated_on</strong>: ${doc.update_on}</div>`;
                         res.send(str);
                    }
                });
            }
            catch(ex){
        }
    }
});

module.exports = postIssue;