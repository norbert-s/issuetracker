'use strict';
const express = require('express');
const expect = require('chai').expect;
require('dotenv').config();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const key = process.env.MLAB_URI;
const {postOne,deleteOne,updateOne} = require('../helpers/joiSchema');
const {MyIssue} = require('../helpers/mySchema.js');

let connection = mongoose.connect(key,{ useNewUrlParser: true })
    .then(()=>console.log('Connected to the mango database'))
    .catch(err => console.error('could not connect to mongo db',err));

module.exports = function (app) {
    app.route('/api/issues/:project')
        .post(function (req,res){
            let body = req.body;
            let iTitle = body.issue_title,
                iText = body.issue_text,
                createdBy = body.created_by,
                assignedTo = body.assigned_to,
                statusText = body.status_text;
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
                });
                console.log('kollekcio :');
                myIssue.save((err, doc) => {
                    if (err) return res.send(err);
                    else {
                        res.send({
                            result: 'Successfully created',
                            title: iTitle,
                            text: iText,
                            created_by: createdBy,
                            assigned_to: assignedTo,
                            status_text: statusText,
                            id: doc._id
                        });
                    }
                });
            }
        })
        // .put(function(req,res){
        //     let body = req.body;
        //     let iTitle = body.issue_title,
        //         iText = body.issue_text,
        //         createdBy = body.created_by,
        //         assignedTo = body.assigned_to,
        //         statusText = body.status_text,
        //         id= body._id,
        //         status = body.status;
        //     console.log(`${iText}  ${iTitle} ${createdBy}`);
        //     let joiUpdate = updateOne.validate({
        //         id:id
        //     });
        //     MyIssue.
        // })
        .delete(function (req, res){
            let id = req.body._id;
            console.log(id);
            let joiDelete = deleteOne.validate({
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
}