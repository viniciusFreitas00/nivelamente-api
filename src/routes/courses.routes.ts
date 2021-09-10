import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateCousesServices from '../services/CreateCousesServices';
import UpdateCoursesService from '../services/UpdateCoursesService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import GetCoursesServices from '../services/GetCoursesServices';

const upload = multer(uploadConfig);
const coursesRouter = Router();

coursesRouter.get('/', async (request, response) => {
  try {
    const courses = await GetCoursesServices({});

    return response.json(courses);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

coursesRouter.get('/:courseID', async (request, response) => {
  try {
    const { courseID } = request.params;

    const courses = await GetCoursesServices({ courseID });

    return response.json(courses);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

coursesRouter.use(ensureAuthenticated);

coursesRouter.post('/', upload.single('image'), async (request, response) => {
  try {
    const { id } = request.user;
    const { body } = request;
    const { key } = request.file as Express.Multer.File;

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

    const updated = await UpdateCoursesService({ id, ...body });

    return response.json({ updated });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default coursesRouter;
