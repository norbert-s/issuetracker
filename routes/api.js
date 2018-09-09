'use strict';
const express = require('express');
const expect = require('chai').expect;
require('dotenv').config();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const key = process.env.MLAB_URI;
const {postOne,deleteOne,updateOne,getOne} = require('../helpers/joiSchema');
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
        })
        .put(function(req,res){
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
                if(myIssue==undefined) res.send('id cannot be found in the database');
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
                    await MyIssue.findById({_id:id},function(err,doc){
                        res.send(doc);
                    });
                }

            })
        })
        .get(function (req,res){
            let body = req.query;
            let id=body._id,
                iTitle = body.issue_title,
                iText = body.issue_text,
                createdBy = body.created_by,
                assignedTo = body.assigned_to,
                statusText = body.status_text,
                _status=body.status,
                statusItt = detStatus(_status);

            console.log('status'+_status);
            function detStatus(_status){
                if(_status==='o'){
                    console.log('itt o');
                   return true;
                }
                else if(_status==='c'){
                    console.log('itt c');
                     return 'false';
                }
                else{
                    console.log('itt null');
                    return null;
                }
            }

            console.log(_status);
                // checkThis();
            console.log(`title ${iTitle} text ${iText}   createdby ${createdBy} `);
            let myObj ={_id:id,title:iTitle,text:iText,created_by:createdBy,
                assigned_to:assignedTo,status_text:statusText,status:statusItt};

            let joiVal = getOne.validate({
                title: iTitle,
                text: iText,
                created_by: createdBy,
            });
            function findQueryCreator(myObj){
                let newObj = myObj;

                for(let i in newObj){
                    console.log(`ez az iiiiiiii${i}: ${newObj[i]}`);
                    if(newObj[i]==undefined || newObj[i]=='' || newObj[i]==null){
                        // /console.log(newObj.i);
                        // console.log('ifbe'+newObj[i]);
                        delete newObj[i];
                    }
                }
                return newObj;
            }
            // myObj.status = statusItt;



            if (joiVal.error) res.send(joiVal.error.message);
            else{
                let myNewObj = findQueryCreator(myObj);
                console.log('myogbj');
                console.log(myNewObj);
                 MyIssue.find(myNewObj).exec( function(err,myIssue) {
                    // console.log('myissue elotte'+myIssue);
                        if(err) res.send('no data can be gathered based on provided query');
                        else{
                            res.send(myIssue);
                        }
                //
                })
            }
        })
        .delete(function (req, res){
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
}