import { Router } from 'express';
import teste from '../services/teste';

const testeRouter = Router();

testeRouter.get('/', async (request, response) => {
  const aux = await teste();

  return response.json({ data: aux });
});

export default testeRouter;
