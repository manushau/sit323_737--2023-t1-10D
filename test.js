const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');

chai.use(chaiHttp);
chai.should();

describe('Password Strength Checker', () => {
  it('should return weak password for a password with less than 6 characters', (done) => {
    chai
      .request(app)
      .post('/check-password')
      .send({ password: 'abc' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('strength').eql('Weak');
        done();
      });
  });

  it('should return medium password for a password with only lowercase letters', (done) => {
    chai
      .request(app)
      .post('/check-password')
      .send({ password: 'abcdefg' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('strength').eql('Medium');
        done();
      });
  });

  it('should return strong password for a password with uppercase letters, lowercase letters, digits, and symbols', (done) => {
    chai
      .request(app)
      .post('/check-password')
      .send({ password: 'Abc123!@#' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('strength').eql('Strong');
        done();
      });
  });
});
