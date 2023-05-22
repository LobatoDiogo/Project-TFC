import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { app } from '../app';
import TeamService from '../services/teams.service';
import { teamWithId, teams } from '../mocks/teams.mock';
const { expect } = chai;


chai.use(chaiHttp);

describe('Teams Controller testes', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('Testa get/teams', () => {
    it('Verfica se retorna um array de teams', async () => {
      sinon.stub(TeamService, 'findAll').resolves(teams);

      const response = await chai.request(app).get('/teams');

      expect(response.body).to.be.deep.equal(teams);
      expect(response.status).to.be.equal(200);
    });

    it('Verifica se encontra um time pelo id', async () => {
      sinon.stub(TeamService, 'findById').resolves(teamWithId);

      const response = await chai.request(app).get('/teams/1');

      expect(response.body).to.be.deep.equal(teamWithId);
      expect(response.status).to.be.equal(200);
    });
  });
});