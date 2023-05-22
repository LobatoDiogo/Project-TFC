import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// import { app } from '../app';

// import { Response } from 'superagent';
import MatchesModel from '../database/models/match.model';
import MatchesService from '../services/matches.service';
import TeamService from '../services/teams.service';
import { allMatches, createMatch, matchCreated } from '../mocks/matches.mock';
// @ts-ignore
import chaiAsPromised = require('chai-as-promised');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('finishMatch', () => {
  let findByPkStub: sinon.SinonStub;
  let saveStub: sinon.SinonStub;

  beforeEach(() => {
    findByPkStub = sinon.stub(MatchesModel, 'findByPk');
    saveStub = sinon.stub(MatchesModel.prototype, 'save');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Verifica se termina a partida e salva', async () => {
    const matchId = 123;
    const match = new MatchesModel();

    findByPkStub.withArgs(matchId).resolves(match);

    const result = await MatchesService.finishMatch(matchId);

    expect(result).to.deep.equal(match.toJSON());
    expect(match.inProgress).to.be.false;
    expect(saveStub.calledOnce).to.be.true;
  });

  it('Verifica se ao não achar partida, não é salvo', async () => {
    const matchId = 123;

    findByPkStub.withArgs(matchId).resolves(null);

    const result = MatchesService.finishMatch(matchId);

    await expect(result).to.be.rejectedWith('Match not found');
    expect(saveStub.called).to.be.false;
  });

  describe('Testa findAll', () => {
    it('Verifica se retorna um array todos os matches', async () => {
      // @ts-ignore
      sinon.stub(MatchesModel, 'findAll').resolves(allMatches as unknown as MatchesModel[]);

      const response = await MatchesService.getMatches();

      expect(response).to.be.deep.equal(allMatches);
    });

    it('Verifica se retorna true inProgress', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(allMatches as unknown as MatchesModel[]);

      const response = await MatchesService.matchInProgress('true');

      expect(response).to.be.deep.equal(allMatches);
    });
  });

  describe('Testa create', () => {
    it('Verifica se retorna uma partida criada', async () => {
      // @ts-ignore
      sinon.stub(MatchesModel, 'create').resolves(matchCreated);
      // @ts-ignore
      sinon.stub(TeamService, 'findById').resolves({});

      const response = await MatchesService.createMatch(createMatch);

      expect(response).to.be.deep.equal(matchCreated);
    });
  });
});
