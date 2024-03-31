import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, Typography, MenuItem } from "@mui/material";
/**
 * You will find globals from this file useful!
 */
import {MY_BU_ID, BASE_API_URL, GET_DEFAULT_HEADERS} from "./globals";
import { IUniversityClass } from "./types/api_types";
import { dummyData, GradeTable } from "./components/GradeTable";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);

  /**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */
  // const fetchSomeData = async () => {
  //   const res = await fetch("https://cat-fact.herokuapp.com/facts/", {
  //     method: "GET",
  //   });
  //   const json = await res.json();
  //   console.log(json);
  // };

  /**
   * On initial mount, this component fetches the class list for fall2022 semeseter
   *
   */
  useEffect(() => {
    const fetchClassListData = async () => {
      try {
        const res = await fetch(BASE_API_URL +"/class/listBySemester/fall2022?buid=" + MY_BU_ID, {
          method: "GET",
          headers: GET_DEFAULT_HEADERS()
        });
        const json: IUniversityClass[] = await res.json();
        setClassList(json);  //update use state hook
        // console.log(json);  
      }
      catch(err: any) {
        console.log(err); 
      }
    }
  
    fetchClassListData();
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>

          <div style={{ width: "100%" }}>
            {/* if classList has been updated after initial mount render, only then below code executed*/}
            {classList.length>0 && 
            <Select fullWidth={true} label="Class" value={currClassId} onChange={(event: any) => setCurrClassId(event.target.value)}>
              {/* To write this code, I referenced https://mui.com/material-ui/react-select/ */}
              {classList.map(curClass => <MenuItem key={curClass.classId} value={curClass.classId}>{curClass.title}</MenuItem>)}
            </Select>}
          </div>

        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          {/* <div>Place the grade table here</div> */}
          {/* if curClassId has been updated after class selection by user, only then below code executed*/}
          {currClassId != "" && <GradeTable currClassId={currClassId}></GradeTable>}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
