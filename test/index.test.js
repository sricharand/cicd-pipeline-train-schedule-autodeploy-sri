var request = require('supertest');
var express = require('express');

var app = require('../app');

describe('Index Page', function() {
  // Increase the timeout to 5000ms (5 seconds) for this test
  this.timeout(5000);

  it("renders successfully", function(done) {
    request(app).get('/').expect(200, done);
  });
});

describe('Trains API', function() {
  // Increase the timeout to 5000ms (5 seconds) for this test
  this.timeout(5000);

  it("returns data successfully", function(done) {
    request(app)
      .get('/trains')
      .expect(200)
      .expect('Content-Length', '1093')
      .expect('Content-Type', /json/, done);
  });
});

