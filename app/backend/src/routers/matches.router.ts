import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import tokenVerify from '../middlewares/TokenMiddleware';

const matchesRouter = Router();

matchesRouter
  .get('/', MatchesController.getMatches)
  .patch('/:id/finish', tokenVerify, MatchesController.finishMatch)
  .patch('/:id', tokenVerify, MatchesController.updateMatch);

export default matchesRouter;
