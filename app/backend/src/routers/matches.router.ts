import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = Router();

matchesRouter
  .get('/', MatchesController.getMatches);

export default matchesRouter;