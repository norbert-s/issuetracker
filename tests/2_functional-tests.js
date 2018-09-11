/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
global.chai = chai;

global.expect = chai.expect;


chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {

      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
        });
      });

      test('Required fields filled in', function(done) {
          chai.request(server)
              .post('/api/issues/apitest')
              .send({
                  issue_title: 'Title',
                  issue_text: 'text',
                  created_by: 'Functional Test - Every field filled in',
                  assigned_to: '',
                  status_text: ''
              })
              .end(function(err, res){
                  assert.equal(res.status, 200);

                  //fill me in too!

                  done();
              });
      });

      test('Missing required fields', function(done) {
          chai.request(server)
              .post('/api/issues/apitest')
              .send({
                  issue_title: '',
                  issue_text: '',
                  created_by: '',
                  assigned_to: '',
                  status_text: ''
              })
              .end(function(err, res){
                  assert.equal(res.status, 200);
                  assert.equal(err);
                  done();
              });
      });

    });

    suite('PUT /api/issues/{project} => text', function() {

      test('No body', function(done) {
          chai.request(server)
              .put('/api/issues/apitest')
              .send({
                  _id :'',
                  issue_title: '',
                  issue_text: '',
                  created_by: '',
                  assigned_to: '',
                  status_text: ''
              })
              .end(function(err, res){
                  assert.equal(res.status, 200);
                  // console.log(res.text);
                  assert.equal(res.text,'id field is mandatory , please provide a valid id');
                  done();
              });
      });

      test('One field to update', function(done) {
          chai.request(server)
          .put('/api/issues/apitest')
              .send({
                  _id :'5b9714bb16f727e12c889521',
                  issue_title: '',
                  issue_text: '',
                  created_by: 'Functional Test - updating this2',
                  assigned_to: '',
                  status_text: ''
              })
              .end(function(err, res){
                  assert.equal(res.status, 200);
                  done();
              });
      });

      test('Multiple fields to update', function(done) {
          chai.request(server)
              .put('/api/issues/apitest')
              .send({
                  _id :'5b9714bb16f727e12c889521',
                  issue_title: '',
                  issue_text: '',
                  created_by: 'Functional Test - updating this2',
                  assigned_to: 'fcc',
                  status_text: 'again'
              })
              .end(function(err, res){
                  assert.equal(res.status, 200);
                  done();
              });
      });

    });

    suite('GET /api/issues/{project} => Array of objects with issue data', function() {

      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/apitest')
        .query({status:true})
        .end(function(err, res){
          assert.equal(res.status, 200);
          expect(res.text).to.be.a('string');
          done();
        });
      });

      test('One filter', function(done) {
          chai.request(server)
              .get('/api/issues/apitest')
              .query({status:true})
              .end(function(err, res){
                  assert.equal(res.status, 200);
                  expect(res.text).to.be.a('string');
                  done();
              });
      });

      test.only('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
          chai.request(server)
                  .get('/api/issues/apitest')
                  .query({status:true,title:'whatever'})
                  .end(function(err, res){
                      assert.equal(res.status, 200);
                      expect(res.text).to.be.a('string');
                      done();
                  });
      });

    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
          chai.request(server)
              .delete('/api/issues/apitest')
              .query({})
              .end(function(err, res){
                  assert.equal(res.status, 200);
                  // console.log('response');
                  // console.log(res.text);
                  assert.equal(res.text,'the id that you are trying to delete is not in the database');
                  done();
              });
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
            .delete('/api/issues/apitest')
            .query({_id:'5b970e4ce95887e04ce059d6'})
            .end(function(err,res){
                assert.equal(res.status,200);
                assert.equal(res.text);
                done();
            });
      });
        test('not valid id', function(done) {
            chai.request(server)
                .delete('/api/issues/apitest')
                .query({_id:'5b970e4ce95887e04ce059d6'})
                .end(function(err,res){
                    assert.equal(res.status,200);
                    // console.log(res);
                    assert.equal(res.text,'the id that you are trying to delete is not in the database');
                    done();
                });
        });
    });

});
