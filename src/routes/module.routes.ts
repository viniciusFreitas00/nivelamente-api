import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateModulesService from '../services/modules/CreateModulesService';

const moduleRoutes = Router();

moduleRoutes.use(ensureAuthenticated);

moduleRoutes.post('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { course_id, title, video, content } = request.body;
    const module = await CreateModulesService({
      id,
      course_id,
      title,
      video,
      content,
    });
    return response.json(module);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

export default moduleRoutes;
