import Courses from '../../models/Courses';
import database from '../../database';

interface Request {
  courseID?: string;
}

async function GetCoursesServices({
  courseID = 'All',
}: Request): Promise<Courses[] | Courses | null> {
  if (courseID == 'All') {
    let courses = await database.query<Courses[]>(
      `SELECT ID,USER_ID, DESCRIPTION, CATEGORY, STATUS, CREATED_AT,UPDATED_AT, CONCAT('https://recipes-share.s3.sa-east-1.amazonaws.com/', IMAGE) as IMAGE FROM COURSES WHERE STATUS = 'published'`,
    );
    return courses;
  } else {
    let courses = await database.oneOrNone<Courses>(
      `SELECT ID,USER_ID, DESCRIPTION, CATEGORY, STATUS, CREATED_AT,UPDATED_AT, CONCAT('https://recipes-share.s3.sa-east-1.amazonaws.com/', IMAGE) as IMAGE FROM COURSES WHERE ID = $[courseID] AND STATUS = 'published'`,
      { courseID },
    );
    return courses;
  }
}

export default GetCoursesServices;
