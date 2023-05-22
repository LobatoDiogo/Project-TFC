import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import { Response } from 'superagent';
import { app } from '../app';
import { allMatches, createMatch } from '../mocks/matches.mock';
import MatchesService from '../services/matches.service';
import * as Jwt from '../utils/Auth';
import { matchCreated } from '../mocks/matches.mock';

const { expect } = chai;


chai.use(chaiHttp);

describe('Matches Controller testes', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('Testa get/matches', () => {
    it('Verfica se retorna um array de matches', async () => {
      sinon.stub(MatchesService, 'getMatches').resolves(allMatches);

      const response = await chai.request(app).get('/matches');

      expect(response.body).to.be.deep.equal(allMatches);
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Testa patch/matches/:id/finish', () => {
    it('Verifica se retorna uma partida finalizada', async () => {
      sinon.stub(Jwt, 'validateToken').returns({ id: 1 });
      sinon.stub(MatchesService, 'finishMatch').resolves(allMatches[0]);

      const response = await chai.request(app).patch('/matches/1/finish').set('Authorization', 'valid-token');

      expect(response.body).to.be.deep.equal({ message: 'Match finished', match: allMatches[0] });
      expect(response.status).to.be.equal(200);
    });
  });

  describe('Testa post/matches', () => {
    it('Verifica se retorna uma partida criada', async () => {
      sinon.stub(Jwt, 'validateToken').returns({ id: 1 });
      sinon.stub(MatchesService, 'createMatch').resolves(matchCreated);

      const response = await chai.request(app).post('/matches').send(createMatch).set('Authorization', 'valid-token');

      expect(response.body).to.be.deep.equal(matchCreated);
      expect(response.status).to.be.equal(201);
    });
  });
});
