/**
 * This file can be used to store global variables that you need to access across multiple places.
 * We've put a few here that we know you will need.
 * Fill in the blank for each one
 */
export const MY_BU_ID: number = 32832379;  //converted to ts code
export const BASE_API_URL: string = "https://spark-se-assessment-api.azurewebsites.net/api"; //converted to ts code
// You can get this from Gradescope aka x-functions-key
export const TOKEN: string = "6se7z2q8WGtkxBlXp_YpU-oPq53Av-y_GSYiKyS_COn6AzFuTjj4BQ=="; //converted to ts code
// This is a helper function to generate the headers with the x-functions-key attached
export const GET_DEFAULT_HEADERS = (): Headers => {  //converted to ts code
  var headers = new Headers();
  headers.append('x-functions-key', TOKEN);
  // You will need to add another header here
  // If you do not, the API will reject your request (:
  return headers;
};

/**
 * The data structure that has a list of student and their final grade. Used in calculate_grade.ts, and GradeTable.tsx
 */
export type StudentFinalGradeMapping = {
  id: string,  //student id, just named id for mui table purposes
  studentName: string,
  classId: string,
  className: string,
  semester: string,
  finalGrade: number
}
