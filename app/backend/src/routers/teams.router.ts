import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const teamsRouter = Router();

teamsRouter
  .get('/', TeamController.findAll)
  .get('/:id', TeamController.findById);

export default teamsRouter;
