import database from '../database';
import config from '../config';

async function teste() {
  try {
    return await database.query('SELECT "name" FROM USERS');
  } catch (e) {
    console.log(e);
  }
}

export default teste;
