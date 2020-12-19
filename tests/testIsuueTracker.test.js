
const fetch = require("node-fetch");
myPromise = fetch('https://issue-tracker-ns.herokuapp.com/api/issues/apitest', { method: 'get' });
myPromise2 = fetch('https://issue-tracker-ns.herokuapp.com/api/issues/apitest', { method: 'get' });
//myFetch = fetch('https://issue-tracker-ns.herokuapp.com/api/issues/apitest', { method: 'get' });
//let form={};
const FormData = require('form-data');
 
const form = new FormData();
form.append('issue_title', 'dssssssssssssss');
const headers = new Headers();
global.headers =headers;
headers.append('Content-type', 'application/json');

myFetch = fetch('https://issue-tracker-ns.herokuapp.com/api/issues/apitest', { method: 'post',body:JSON.stringify({issue_title:'sdfsfdsfdfdsfsd'})});



async function myFetch2(){
    return
     fetch('https://issue-tracker-ns.herokuapp.com/api/issues/apitest', { method: 'get' });
} 
/*form ={
    issue_title:'haghgfhgfhgfhghgfhfhliho',
    issue_text:'heyho',
    created_by:"Norbert",
    assigned_to:"Philip"

}*/
async function myFetch3(){
    return fetch('https://issue-tracker-ns.herokuapp.com/api/issues/apitest', { method: 'get',query:{status:"false"} });
} 
let msg;

function callMyPromise(done){
    
    myPromise
        .then(res => res.text()) // expecting a json response
        .then(json => {
            msg = json+"first one";           
            
        })
        .then(()=>{
            callMyPromise2(done);
        });
}

function callMyPromise2(done){
    myPromise2
        .then(res => res.text()) // expecting a json response
        .then(res => {
            console.log(msg);
            console.log(res);
            done();
        });
}

function callMyPromise3(done){
    myPromise3 = new Promise((res,rej)=>{
        if(myFetch){
            res(myFetch);
        }else{
            rej(Error('no post found'));
        }
    })
    .then(res=>res.text())
    .then(res=>{
        console.log(res);
        done();
    });

}
async function callWithAsync(done){
    myFetch
    .then(res=>res.text())
    .then(res=>{
        console.log(res);
        done();
    });
}


//test('get request',done=>callWithAsync(done));
test.only('get request2',done=>callMyPromise3(done));


