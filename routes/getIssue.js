const express = require('express');
const Joi = require('joi');
const router = express.Router();
const expect = require('chai').expect;
const {getOne} = require('../helpers/joiSchema');
const {MyIssue} = require('../helpers/mySchema.js');

let getIssue =router.get('/api/issues/apitest',function (req,res){
    console.log('here we go');
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
                delete newObj[i];
            }
        }
        return newObj;
    }
    if (joiVal.error) res.send(joiVal.error.message);
    else{
        let myNewObj = findQueryCreator(myObj);
        myNewObj.status=statusItt;
        console.log('myogbj');
        console.log(myNewObj);
        let result = MyIssue.find(myNewObj).exec( function(err,myIssue) {
            // console.log('my issue');
            // console.log(myIssue);
            if(err) res.send('There is no data to be found based on your query');
            else if(myIssue=='') res.send('There is no data to be found based on your query');
            else{
                let str = '';
                let keys = Object.entries(myIssue);
                for(let i in keys){
                    str += `<div id="jsonResult" class="jsonClass"><strong>status: </strong>${keys[i][1]['status']}<br>
                    <strong>id</strong>: ${keys[i][1]['_id']}<br>
                    <strong>title</strong>: ${keys[i][1]['title']}<br>
                    <strong>text</strong>: ${keys[i][1]['text']}<br>
                    <strong>created by</strong>: ${keys[i][1]['created_by']}<br>
                    <strong>assigned to</strong>: ${keys[i][1]['assigned_to']}<br>
                    <strong>status text</strong>: ${keys[i][1]['status_text']}<br>
                    <strong>updated on</strong>: ${keys[i][1]['update_on']} <br>
                    <strong>created on</strong>: ${keys[i][1]['created_on']} <br><br></div>`;
                }
                // console.log(myIssue);
                res.send(str);
            }
        })
    }
});
module.exports = getIssue;