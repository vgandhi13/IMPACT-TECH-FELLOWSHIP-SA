/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IUniversityClass, IClassAssignment, IStudent, IClassGrades } from "../types/api_types";
import {MY_BU_ID, BASE_API_URL, GET_DEFAULT_HEADERS, StudentFinalGradeMapping} from "../globals";


/**
 * This function takes in id of student and the class object. It returns grades object of this student
 * 
 */
const fetchStudentGrades = async (studentID: string, klass: IUniversityClass): Promise<IClassGrades> => {
  try {
    const res = await fetch(BASE_API_URL + `/student/listGrades/${studentID}/${klass.classId}?buid=` + MY_BU_ID, {
      method: "GET",
      headers: GET_DEFAULT_HEADERS()
    });
    const json: IClassGrades = await res.json()
    // console.log(json);  
    return json;
  }
  catch(err: any) {
    throw err;
  }
}

/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */
export async function calculateStudentFinalGrade(
  studentID: string,
  classAssignments: IClassAssignment[],
  klass: IUniversityClass
): Promise<StudentFinalGradeMapping> {

  const studentGrades: IClassGrades = await fetchStudentGrades(studentID, klass);
  const grades = studentGrades.grades[0]; // grades of the student in objects grade field. Since grade is assigned to array of single element, we access 0th index
  // console.log(classAssignments, grades)
  const curStudentMapping: StudentFinalGradeMapping = {
    id: studentID,
    studentName: studentGrades.name,
    className: klass.title,
    classId: klass.classId,
    semester: klass.semester,
    finalGrade: classAssignments.reduce((acc, assignment) => { //this will compute the total final grade
      return acc + (assignment.weight * parseInt(grades[assignment.assignmentId]));
    }, 0)
  }

  return curStudentMapping;
}


/**
 * This function takes in the id of a class and returns an array of assignment objects of that class
 * 
 */
const fetchAssignmentsInClass = async (currClassId: string): Promise<IClassAssignment[]> => {
  try {
    const res = await fetch(BASE_API_URL + `/class/listAssignments/${currClassId}?buid=` + MY_BU_ID, {
      method: "GET",
      headers: GET_DEFAULT_HEADERS()
    });
    const json: IClassAssignment[] = await res.json()
    // console.log(json);  
    return json;
  }
  catch(err: any) {
    throw err;
  }
}

/**
 * This helper function takes in the ids of all students and returns the respective student objects in an array
 * 
 */
const fetchStudentsInClassHelper = async (jsonStudentIDs: string[]) => {
  let students: IStudent[] = []
  // reference: https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
  students = await Promise.all(jsonStudentIDs.map(async (studentID: string) => { //using Promise.all will await on all the promises in the returned array to resolved
    try {
        const res = await fetch(BASE_API_URL + `/student/GetById/${studentID}?buid=${MY_BU_ID}`, {
            method: "GET",
            headers: GET_DEFAULT_HEADERS()
        });
        const json: IStudent[] = await res.json(); // json assigned to an array with a single student
        // console.log(json[0]);  
        return json[0];
    }
    catch(err: any) {
        // console.log(err); 
        throw err; //returning null for the failed request
    }
  }));

  // console.log(students);
  return students;
}

/**
 * This function takes in the id of a class and returns an array of student objects in the class
 * 
 */
const fetchStudentsInClass = async (currClassId: string): Promise<IStudent[]> => {
  try {
    const res = await fetch(BASE_API_URL + `/class/listStudents/${currClassId}?buid=` + MY_BU_ID, {
      method: "GET",
      headers: GET_DEFAULT_HEADERS()
    });
    const jsonStudentIDs: string[] = await res.json();
    // console.log(jsonStudentIDs); 
    
    return await fetchStudentsInClassHelper(jsonStudentIDs);
  }
  catch(err: any) {
    throw err;
  }
}

/**
 * This function takes in the id of a class and returns the object of class
 * 
 */
const fetchKlass = async (currClassId: string): Promise<IUniversityClass> => {
  try {
    const res = await fetch(BASE_API_URL + `/class/GetById/${currClassId}?buid=` + MY_BU_ID, {
      method: "GET",
      headers: GET_DEFAULT_HEADERS()
    });
    const json: IUniversityClass = await res.json()
    // console.log(json);  
    return json;
  }
  catch(err: any) {
    throw err;
  }
}

/**
 * You need to write this function! You might want to write more functions to make the code easier to read as well.
 * 
 *  If you are reading here and you haven't read the top of the file...go back.
 * 
 * @param classID The ID of the class for which we want to calculate the final grades
 * @returns Some data structure that has a list of each student and their final grade.
 */
export async function calcAllFinalGrade(classID: string){ //: Promise<StudentFinalGradeMapping[]> 
  try {
    const classAssignments: IClassAssignment[] = await fetchAssignmentsInClass(classID);
    const students: IStudent[] = await fetchStudentsInClass(classID);
    const klass: IUniversityClass = await fetchKlass(classID);
    let finalStudentsGradesMapping: StudentFinalGradeMapping[] = []
    // reference: https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
    finalStudentsGradesMapping = await Promise.all(students.map(student => calculateStudentFinalGrade(student.universityId, classAssignments, klass)));
    // console.log(finalStudentsGradesMapping)
    return finalStudentsGradesMapping;
  }
  catch(err: any) {
    throw err;
  }
}
