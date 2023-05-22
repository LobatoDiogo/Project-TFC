import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// import { app } from '../app';

// import { Response } from 'superagent';
import TeamModel from '../database/models/team.model';
import TeamService from '../services/teams.service';
import { teams } from '../mocks/teams.mock';
// @ts-ignore
import chaiAsPromised = require('chai-as-promised');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Teams Service testes', () => {

  afterEach(() => {
    sinon.restore();
  });

  describe('Testa findAll', () => {
    it('Verifica se retorna um array todos os teams', async () => {
      // @ts-ignore
      sinon.stub(TeamModel, 'findAll').resolves(teams);

      const response = await TeamService.findAll();

      expect(response).to.be.deep.equal(teams);
    });

    it('Verifica se retorna um array vazio', async () => {
      sinon.stub(TeamModel, 'findAll').resolves([]);

      const response = await TeamService.findAll();

      expect(response).to.be.deep.equal([]);
    });
  })
  describe('Testa findById', () => {
    it('Verifica se encontra um team pelo id', async () => {
      // @ts-ignore
      sinon.stub(TeamModel, 'findOne').resolves({ id: 1, teamName: 'test' });

      const response = await TeamService.findById(1);

      expect(response).to.be.deep.equal({ id: 1, teamName: 'test' });
    });
    it('Verifica se retorna um erro ao não achar um team', async () => {
      sinon.stub(TeamModel, 'findOne').resolves(null);

      const response = TeamService.findById(111);

      await expect(response).to.be.rejectedWith('Team does not exists');
    })
  });
});
