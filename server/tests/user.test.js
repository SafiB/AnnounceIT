/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import testdata from './testData/testdata';

chai.use(chaiHttp);
chai.should();
const { expect } = chai;

describe('User tests', () => {
  it('should display a welcome message', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('Welcome!');
        done();
      });
  });

  it('should be signup', (done) => {
    const user = testdata[0];
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(201);
        expect(res.body.message).to.equal('User was created successfully');
        done();
      });
  });

  it('should not duplicate a user', (done) => {
    const user = testdata[0];
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(409);
        expect(res.body.error).to.equal('Email already exists');
        done();
      });
  });

  it('Should login a user', (done) => {
    const user = testdata[2];
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((error, res) => {
        res.body.status.should.be.equal(200);
        expect(res.body.message).to.equal('You have Logged in successfully');
        done();
      });
  });
});
