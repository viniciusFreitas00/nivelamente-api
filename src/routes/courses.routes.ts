import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateCousesServices from '../services/CreateCousesServices';
import UpdateCoursesService from '../services/UpdateCoursesService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig);
const coursesRouter = Router();

coursesRouter.use(ensureAuthenticated);

coursesRouter.post('/', upload.single('image'), async (request, response) => {
  try {
    const { id } = request.user;
    const { body } = request;
    const { key } = request.file;

    const courses = await CreateCousesServices({ id, key, ...body });

    return response.json(courses);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

coursesRouter.put('/', async (request, response) => {
  try {
    const { id } = request.user;
    const { body } = request;

    const courses = await UpdateCoursesService({ id, ...body });

    return response.json(courses);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default coursesRouter;
