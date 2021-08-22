import { Router } from 'express';

import CreateCousesServices from '../services/CreateCousesServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const coursesRouter = Router();

coursesRouter.use(ensureAuthenticated);

coursesRouter.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { body } = request;
    
    const courses = await CreateCousesServices({ id, ...body });

    return response.json(courses);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default coursesRouter;
