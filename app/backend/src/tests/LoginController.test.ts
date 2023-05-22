import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../database/models/user.model';
import LoginService from '../services/login.service';

const { expect } = chai;


chai.use(chaiHttp);

describe('Login Controller testes', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('Testa post/login', () => {
    it('Verifica se não passar email ou password válido, retorna status 401 e uma mensagem de erro', async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);

      const response = await chai.request(app).post('/login')
        .send({
          email: 'test@test.com',
          password: 'testeeee'
        });

      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
      expect(response.status).to.be.equal(401);
    });

    it('Verifica se ao não passar email e password retorna status 400 e uma mensagem de erro', async () => {
      const response = await chai.request(app).post('/login');

      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(response.status).to.be.equal(400);
    });

    it('Verifica se retorna status 200 e um token', async () => {
      sinon.stub(LoginService, 'userLogin').resolves('token');

      const response = await chai.request(app).post('/login')
        .send({
          email: 'test@email.com',
          password: 'testeeee'
        });
      expect(response.body).to.be.deep.equal({ token: 'token' });
      expect(response.status).to.be.equal(200);
    });
  });
});
