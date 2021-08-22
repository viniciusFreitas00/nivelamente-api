import database from '../database';

async function teste() {
  try {
    return await database.query('SELECT "name" FROM USERS');
  } catch (e) {
    console.log(e);
  }
}

export default teste;
