/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a class as returned by the API
 */
export interface IUniversityClass {
  classId: string;
  title: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  status: string;
  semester: string;
}

/**
 * This represents an assignment as returned by the API
 */
export interface IClassAssignment {
  assignmentId: string;
  classId:	string;
  date:	string;
  weight: number;
}

/**
 * This represents a student as returned by the API
 */
export interface IStudent {
  dateEnrolled:	string;
  name:	string;
  status:	string;
  universityId:	string;
}

/**
 * This represents a student's class grades as returned by the API
 */
export interface IClassGrades {
  classId:	string;
  grades: any;
  name:	string;
  studentId:	string;
}