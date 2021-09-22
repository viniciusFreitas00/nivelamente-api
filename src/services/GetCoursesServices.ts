import Courses from '../models/Courses';
import database from '../database';

interface Request {
  courseID?: string;
}

async function GetCoursesServices({
  courseID = 'All',
}: Request): Promise<Courses[] | Courses | null> {
  if (courseID == 'All') {
    let courses = await database.query<Courses[]>('SELECT * FROM COURSES');
    return courses;
  } else {
    let courses = await database.oneOrNone<Courses>(
      `SELECT * FROM COURSES WHERE ID = $[courseID] AND STATUS = 'published'`,
      { courseID },
    );
    return courses;
  }
}

export default GetCoursesServices;
