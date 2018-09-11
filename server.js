'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const routerName = require('./routes/getIssue.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');

const app = express();
require('dotenv').config();
const key = process.env.MLAB_URI;
const mongodb = require('mongodb');
app.use('/public', express.static(process.cwd() + '/public'));
app.use(helmet());
app.use(helmet.hidePoweredBy({setTo: "PHP 4.2"}));
app.use(cors({origin: '*'})); //For FCC testing purposes only
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let connection = mongoose.connect(key,{ useNewUrlParser: true })
    .then(()=>console.log('Connected to the mango database'))
    .catch(err => console.error('could not connect to mongo db',err));
//Sample front-end

app.use(helmet());
app.use(helmet.hidePoweredBy({setTo: "PHP 4.2"}));
app.route('/:project/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/issue.html');
  });

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
// fccTestingRoutes(app);

//Routing for API 
const getIssue= require('./routes/getIssue.js');
const postIssue= require('./routes/postIssue.js');
const deleteIssue= require('./routes/deleteIssue.js');
const updateIssue= require('./routes/updateIssue.js');
app.use(getIssue);
app.use(postIssue);
app.use(deleteIssue);
app.use(updateIssue);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        const error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 3500);
  }
});




module.exports = app; //for testing
