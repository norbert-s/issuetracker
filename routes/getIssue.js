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
        console.log('myogbj');
        console.log(myNewObj);
        MyIssue.find(myNewObj).exec( function(err,myIssue) {
            if(err) res.send('no data can be gathered based on provided query');
            else{
                let str = '';

                let keys = Object.entries(myIssue);
                for(let i in keys){
                    str += `status: ${keys[i][1]['status']}<br>
                            id: ${keys[i][1]['_id']}<br>
                            title: ${keys[i][1]['title']}<br>
                            text: ${keys[i][1]['text']}<br>
                            created by: ${keys[i][1]['created_by']}<br>
                            assigned to: ${keys[i][1]['assigned_to']}<br>
                            status text: ${keys[i][1]['status_text']}<br>
                            updated on: ${keys[i][1]['update_on']} <br>
                            created on: ${keys[i][1]['created_on']} <br><br>`;
                }
                res.send(str);
            }
        })
    }
});
module.exports = getIssue;