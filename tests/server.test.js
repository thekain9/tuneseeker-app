// Importing the 'chai' library for assertions.
const chai = require('chai');

// Importing the 'chai-http' plugin to allow HTTP request simulations with chai.
const chaiHttp = require('chai-http');

// Importing the server application (assuming it exports an express app).
// Adjust the path if your server entry point is located elsewhere.
const app = require('../server'); 
const should = chai.should();

// Tell chai to use the 'chai-http' plugin.
chai.use(chaiHttp);

// Grouping related tests under the "API Endpoints" category.
describe('API Endpoints', () => {
  // Grouping tests related to the /api/search/:term/:country/:media route.
  describe('/GET search', () => {

    // A single test to check if the search route returns correct results.
    it('it should GET search results', (done) => {

      // Using chai to send an HTTP GET request to our app.
      chai.request(app)
        .get('/api/search/beatles/gb/music')  // Sending request to this specific endpoint.
        .end((err, res) => {  // Callback function after the request is completed.

          // Assertion: The response status should be 200 (OK).
          res.should.have.status(200);

          // Assertion: The response body should be of type object.
          res.body.should.be.a('object');

          // Assertion: The 'results' property of the response body should be an array.
          res.body.results.should.be.a('array');

          // Signify the end of this test. If 'done()' isn't called, the test will hang.
          done();
        });
    });
  });
});


