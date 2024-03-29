import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Axios from '../AxiosInstance';
import Swal from 'sweetalert2';
import "../Assets/CSS/Dashboard.css"

export default function CDashboard() {
  const [PdfCount, setPDFCount] = useState({});
  const [TaskCounts, setTaskCounts] = useState({});
  const role = localStorage.getItem("Role");

  // API call to fetch PDF and Task counts
  const fetchData = async () => {
    try {   
      if (role === "Employee") {
        const EmpID = localStorage.getItem("EmpID")
        const empTaskResponse = await Axios.get(`task/emp_count?emp_id=${EmpID}`);
        setTaskCounts(empTaskResponse.data)
      }
      else if(role == "admin" ){
        const pdfResponse = await Axios.get('filter_details/count');
        setPDFCount(pdfResponse.data);

        const taskResponse = await Axios.get('filter_details/get_task_details');
        setTaskCounts(taskResponse.data.status_counts);
      }

    } catch (error) {
      Swal.fire({
        title: error.code,
        icon: "error",
      });
    }
  };

  // Custom Card
  const generateCard = (title, count) => (
    <Grid item xs={12} sm={3.5}>
      <Card className='dashboardCard' style={{ marginBottom: '10px', height: "125px", borderRadius: "15px",boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",}}>
        <CardContent sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography sx={{ ml: 1, fontWeight: "bold", }} variant="h5">{title}</Typography>
          <Typography sx={{ ml: 1, fontSize: "20px", fontWeight: "bold" }} variant="h5">{count}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)', height:"100%", paddingTop:"30px", paddingBottom:"30px"}}>
      <div style={{background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", margin: "20px",paddingBottom:"20px", borderRadius: "20px"}}>
        <Grid container sx={{}} rowSpacing={2} justifyContent="space-between" paddingX="25px">
          <Grid sx={{ mb: 2 }} item xs={12}>
            <h1>Dashboard</h1>
          </Grid>
          <>
            {role === "admin" && (
              <>
                {generateCard("Processed PDF", PdfCount.processed_pdf)}
                {generateCard("Partially Completed Voters", PdfCount.partially_completed_documents)}
                {generateCard("Completed Voters", PdfCount.completed_documents)}
                {generateCard("Task Assigned", TaskCounts.total_count)}
                {generateCard("Task in Progress", TaskCounts.progress)}
                {generateCard("Tasks completed", TaskCounts.completed)}
              </>
            )}
            {role === "Employee" && (
              <>
                {generateCard("Task Assigned", TaskCounts.total_tasks)}
                {generateCard("Task in Progress", TaskCounts.progress_count)}
                {generateCard("Tasks completed", TaskCounts.completed_count)}
              </>
            )}
          </>
        </Grid>
      </div>

    </div>
  );
}
