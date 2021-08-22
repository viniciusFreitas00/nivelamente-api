import { Router } from 'express';

//import Test from '../services/Test.services';

const testRouter = Router();

testRouter.get('/', async (request, response) => {

  return response.json({ data: 'teste' });
});

export default testRouter;
