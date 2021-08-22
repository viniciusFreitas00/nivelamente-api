import { Router } from 'express';

import CreateUsersService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password, teacher } = request.body;

    const user = await CreateUsersService({
      name,
      email,
      password,
      teacher,
    });

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;