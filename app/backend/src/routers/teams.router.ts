import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const teamsRouter = Router();

teamsRouter
  .get('/', TeamController.findall)
  .get('/:id', TeamController.findById);

export default teamsRouter;
