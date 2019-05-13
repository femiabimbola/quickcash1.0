/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-Http';
import server from '../server';

chai.should();
chai.use(chaiHttp); // from import

// The test to ask for a loan
const loginUrl = '/api/v1/auth/siginin';
const loanurl = '/api/v1/loans';

let userToken;

describe('Test user loan application', () => {
  describe('POST/loans', () => {
    const theuser = {
      email: 'jimiagbaje@mail.com',
      password: 'jimipassword',
    };
    before((done) => {
      chai.request(server)
        .post(`${loginUrl}`)
        .send(theuser)
        .end((err, res) => {
          userToken = `Owner ${res.body.data.taken}`;
          done();
        });
    });
    it('shoud create a user loan', (done) => {
      const userLoan = {
        firstName: 'Jimi',
        lastName: 'agbaje',
        email: 'jimiagbaje@mail.com',
        amount: 30500,
        tenor: 8,
      };
      chai.request(server)
        .post(`${loanurl}`)
        .set('authorization', userToken)
        .send(userLoan)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(201);
          res.body.should.have.property('data');
          done();
        });
    });
    it('should show error if user is not authenticated',
      (done) => {
        const userLoan = {
          firstName: 'Jimi',
          lastName: 'agbaje',
          email: 'jimiagbaje@mail.com',
          amount: 30500,
          tenor: 8,
        };

        chai.request(server)
          .post(`${loanurl}`)
          .set('authorization', userToken)
          .send(userLoan)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.an('object');
            res.body.should.have.property('error');
            done();
          });
      });

    it('should give error if lastName is less than 3 characters', (done) => {
      const userLoan = {
        lastName: 'ji',
        firstName: 'agbaje',
        email: 'jimiagbaje@mail.com',
        amount: 30500,
        tenor: 8,
      };
      chai.request(server)
        .post(`${loanurl}`)
        .set('authorization', userToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should give error if lastName is not a string', (done) => {
      const userLoan = {
        lastName: 456,
        firstName: 'agbaje',
        email: 'jimiagbaje@mail.com',
        amount: 30500,
        tenor: 8,
      };
      chai.request(server)
        .post(`${loanurl}`)
        .set('authorization', userToken)
        .send(userLoan)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('')

});
