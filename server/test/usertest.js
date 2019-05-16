import chai from 'chai';
import chaiHttp from 'chai-Http';
import server from '../server';

chai.should();
chai.use(chaiHttp);

// sign up test
describe('the signup', () => {
  it('should fail if email is not given', (done) => {
    const user = {
      email: '',
      firstName: 'michael',
      lastName: 'john',
      address: '2, Michael',
    }; 
    chai.request(server)
      	.post('/api/v1/users/auth/signup')
     	   .send(user)
      	.end((err, res) => {
       	 res.body.should.have.status(400);
       	 res.body.should.be.a('object');
       	 res.body.should.have.property('error');
       	 res.body.error.should.be.a('string');
       	 res.body.error.should.eql('Email is required');
       	 done();
      });
  });

  it('should fail if email field is invalid', (done) => {
    const user = {
      email: 'sholapemail.com',
    		};
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid email');
        done();
      });
  });

  it('should fail if firstName field is empty', (done) => {
    const user = {
      email: 'sholataiwo@gmail.com',
      firstName: '',
    	};
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name is required');
        done();
      });
  });

  it('should fail if firstName field is a string', (done) => {
    const user = {
      email: 'holataiwo@gmail.com',
      firstName: 56478,
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid first name');
        done();
      });
  	});

  	it('should fail if firstName contains alphabet', (done) => {
    const user = {
      email: 'holataiwo@gmail.com',
      firstName: 'taiwo567',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name has alphabets.');
        done();
      	});
  	 });

  it('should fail if firstName is less than 3 characters', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'mc',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name is less than 3 characters');
        done();
      });
  });

  it('should fail if lastName field is empty', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name is required');
        done();
      });
  });

  it('should fail if lastName field is a string', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: 1234,
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid last name');
        done();
      });
  });

  it('should fail if lastName field contain number', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: 'olami123',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Last name contains number.');
        done();
      });
  });

  it('should fail if firstName is less than 3 characters', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: 'ol',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('First name is less than 3 characters');
        done();
      });
  });

  it('should fail if password field is empty', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: 'Taiwo',
      password: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password is required');
        done();
      });
  });

  it('should fail if address field is invalid', (done) => {
    const user = {
      email: 'lataiwo@gmail.com',
      firstName: 'olami',
      lastName: 'Taiwo',
      password: 'Taiwopass',
      address: 123,
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid address');
        done();
      });
  });

  it('should fail if address field characters are not supported', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: 'Taiwo',
      password: 'Taiwopass',
      address: '@No 8, Epic -Tower.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Address contains unsupported characters.');
        done();
      });
  });

  it('should fail if user signup details exists', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: 'Taiwo',
      password: 'Taiwopass',
      address: 'No 6, Epic Tower.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('User already exists');
        done();
      });
  });

  it('should return success if signup fields supplied are valid', (done) => {
    const user = {
      email: 'olataiwo@gmail.com',
      firstName: 'olami',
      lastName: 'Taiwo',
      password: 'Taiwopass',
      address: 'No 6, Epic Tower.',
    };
    chai.request(server)
      .post('/api/v1/users/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName').eql(user.firstName);
        res.body.data.should.have.property('lastName').eql(user.lastName);
        res.body.data.should.have.property('email').eql(user.email);
        res.body.data.should.have.property('address').eql(user.address);
        res.body.data.should.have.property('status').eql('unverified');
        res.body.data.should.have.property('isAdmin').eql(false);
        done();
      });
  });
});

describe('SignIn Test', () => {
  it('should fail if email field is empty', (done) => {
    const user = {
      email: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Email is required');
        done();
      });
  });

  it('should fail if email field is invalid', (done) => {
    const user = {
      email: 'michaelmail.com',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('Invalid email');
        done();
      });
  });

  it('should fail if password field is empty', (done) => {
    const user = {
      email: 'michael@gmail.com',
      password: '',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('password is required');
        done();
      });
  });

  it('should fail if user is not found', (done) => {
    const user = {
      email: 'notaregistereduser@gmail.com',
      password: 'Notregistered',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('string');
        res.body.error.should.eql('User not found');
        done();
      });
  });

  it('should return success if all login fields supplied are valid', (done) => {
    const user = {
      email: 'michael@gmail.com',
      password: 'michaelsmith',
    };
    chai.request(server)
      .post('/api/v1/users/auth/login')
      .send(user)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName').eql(res.body.data.firstName);
        res.body.data.should.have.property('lastName').eql(res.body.data.lastName);
        res.body.data.should.have.property('email').eql(res.body.data.email);
        res.body.data.should.have.property('address').eql(res.body.data.address);
        res.body.data.should.have.property('status').eql(res.body.data.status);
        res.body.data.should.have.property('isAdmin').eql(res.body.data.isAdmin);
        done();
      });
  });
});

// Not Donex remaining Admin