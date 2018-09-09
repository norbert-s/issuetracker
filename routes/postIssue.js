const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();
const expect = require('chai').expect;
const {postOne} = require('../helpers/joiSchema');
const {MyIssue} = require('../helpers/mySchema.js');

let postIssue = router.post('/api/issues/apitest',function (req,res){
    let body = req.body;
    let iTitle = body.issue_title,
        iText = body.issue_text,
        createdBy = body.created_by,
        assignedTo = body.assigned_to,
        statusText = body.status_text,
        status = true;
    console.log(`${iText}  ${iTitle} ${createdBy}`);
    let joiVal = postOne.validate({
        title: iTitle,
        text: iText,
        created_by: createdBy
    });
    if (joiVal.error) res.send(joiVal.error.message);
    else {
        console.log('user call');
        let myIssue = new MyIssue({
            title: iTitle,
            text: iText,
            created_by: createdBy,
            assigned_to: assignedTo,
            status_text: statusText,
            status:status
        });
        console.log('kollekcio :');
        myIssue.save((err, doc) => {
            if (err) return res.send(err);
            else {
                res.send({
                    result: 'Successfully created',
                    id: doc._id,
                    title: iTitle,
                    text: iText,
                    created_by: createdBy,
                    assigned_to: assignedTo,
                    status_text: statusText,
                    created_on:doc.created_on
                });
            }
        });
    }
});

module.exports = postIssue;