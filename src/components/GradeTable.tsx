import {StudentFinalGradeMapping} from "../globals";
import {  calcAllFinalGrade } from "../utils/calculate_grade";
import { useState, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
export function dummyData() {
  return [];
}

//Reference: https://www.youtube.com/watch?v=mDu54a5U3OU
type GradeTableProps = {
  currClassId: string
}

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
export const GradeTable = (props: GradeTableProps) => {
  const [tableData, setTableData] = useState<StudentFinalGradeMapping[]>([]);  // to store the data recived from calcAllFinalGrade for the particular class
  const [loading, setLoading] = useState(false); // for loading message

  const rows: GridRowsProp = tableData;
  
  //code reference: https://mui.com/x/react-data-grid/getting-started/
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Student ID', width: 150 },
    { field: 'studentName', headerName: 'Student Name', width: 150 },
    { field: 'classId', headerName: 'Class Id', width: 150 },
    { field: 'className', headerName: 'Class Name', width: 150 },
    { field: 'semester', headerName: 'Semester', width: 150 },
    { field: 'finalGrade', headerName: 'Final Grade', width: 150 },
  ];

  useEffect(()=>{
    const computeTableData = async () => {
      try {
        setLoading(true); // set loading state to true before fetching data
        const finalStudentsGradesMapping = await calcAllFinalGrade(props.currClassId);
        setTableData(finalStudentsGradesMapping);
        setLoading(false); // set loading state to false after data is fetched
      } catch (err) {
        throw err;
      }
    }

    computeTableData();
    
  }, [props.currClassId]) //when user selects a different class, call these function to update the table data

  useEffect(() => {
    const rows: GridRowsProp = tableData;
  }, [tableData])

  return (
    <div style={{ height: 500, width: '100%' }}>
      {/* if loading variable is false, table wont be displayed and instead loading message will */}
      {loading ? (
        <p>Data Being Loaded from API...</p>
      ) : (
        <DataGrid rows={rows} columns={columns} />
      )}
    </div>
  );
};
