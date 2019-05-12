// Test for loan  controllers

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);

const loginurl = 

describe('Testing user loan appilcation', () => {
  describe('Post/loans', () => {
    const user = {
      email: 'sola@mailinator.com',
      password: 'hispassword',
    };
    before((finish) => {
      chai
        .request(server)
        .post(``)
    });
  });
});
