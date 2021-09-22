import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import coursesRouter from './courses.routes';
import moduleRoutes from './module.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/courses', coursesRouter);
routes.use('/module', moduleRoutes);

export default routes;
