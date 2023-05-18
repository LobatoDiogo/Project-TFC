import { NextFunction, Request, Response } from 'express';
import UnprocessableEntity from '../utils/UnprocessableEntityError';
import NotFoundError from '../utils/NotFoundError';
import TeamModel from '../database/models/team.model';

const verifyMatch = async (req: Request, _res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    throw new UnprocessableEntity('It is not possible to create a match with two equal teams');
  }

  const homeId = await TeamModel.findByPk(homeTeamId);
  const awayId = await TeamModel.findByPk(awayTeamId);

  if (!homeId || !awayId) {
    throw new NotFoundError('There is no team with such id!');
  }
  next();
};
export default verifyMatch;
