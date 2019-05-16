/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-Http';
import server from '../server';

chai.should();
chai.use(chaiHttp); //

const wrongToken = 'd0NtBedEcE1vEdtH15T0kEn1s1NvAlId';
let Token = '';

// The test to ask for a loan
describe('a loan test', () => {
  const Loan = {
    tenor: '9',
    amount: '2000.00',
    purpose: 'Trip',
    startDate: new Date(),
  };
  it('should fail if user is not logged in', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .send(Loan)
      .end((err, res) => {
        res.body.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Auth failed');
        done();
      });
  });

  it('should fail if user token is invalid', (done) => {
    chai.request(server)
      .post('/api/v1/loans')
      .set('authorization', `Bearer ${wrongToken}`)
      .send(Loan)
      .end((err, res) => {
        res.body.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid token, You need to login or signup');
        done();
      });
  });

  describe('Logged in user create loan test', () => {
    before((done) => {
      chai.request(server)
        .post('/api/v1/users/auth/login')
        .send(userCredentials)
        .end((error, response) => {
          userToken = response.body.data.token;
          done();
        });
    });
    it('should fail if user already has an UNPAID load running', (done) => {
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${Token}`)
        .send(Loan)
        .end((err, res) => {
          res.body.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('string').eql('You have an existing loan');
          done();
        });
     });

    it('if a user is logged in and token is valid, do not create loan if tenor is empty', (done) => {
      validLoan.tenor = '';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${Token}`)
        .send(Loan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan tenor is required');
          done();
        });
     });
     it(' should NOT create Loan if tenor is greater than 12', (done) => {
      validLoan.tenor = '13';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${Token}`)
        .send(Loan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Loan tenor should be between 1 and 12');
          done();
        });
      });
      it('it should NOT create Loan if AMOUNT IS INVALID', (done) => {
      validLoan.tenor = '8';
      validLoan.amount = '@5s7.977';
      chai.request(server)
        .post('/api/v1/loans')
        .set('authorization', `Bearer ${Token}`)
        .send(Loan)
        .end((err, res) => {
          res.body.should.have.status(400);
          res.body.should.be.a('object');
          res.body.error.should.be.a('string');
          res.body.error.should.eql('Valid Loan amount is required');
          done();
        });
       });
      
      describe('Admin Approves Loan Test', () => {
     before((done) => {
     chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(adminCredentials)
      .end((error, response) => {
        adminToken = response.body.data.token;
        response.body.should.have.status(200);
        response.body.should.be.a('object');
        response.body.data.should.have.property('token');
        response.body.data.should.have.property('isAdmin');
        response.body.data.isAdmin.should.eql(true);
        done();
      });
  });




});
