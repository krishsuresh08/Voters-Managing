import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Axios from '../AxiosInstance';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Dashboard() {

  const [PdfCount, setPDFCount] = useState([]);
  const [TaskCounts, setTaskCounts] = useState([]);
  // let location = useLocation();

  // pdf count api
  const PDFcount = () => {
      Axios.get('filter_details/count').then((res) => {
        setPDFCount(res.data)
      }).catch(err => {
        Swal.fire({
          title:err,
          icon:"error",
        })
      });
  };
  // pdf count api
  const TaskCount = () => {
      Axios.get('filter_details/get_task_details').then((res) => {
        setTaskCounts(res.data.status_counts)
      }).catch(err => {
        Swal.fire({
          title:err,
          icon:"error",
        })
      });
  };

  // individual's tasks api

  const AdminDash = 
  <Grid container rowSpacing={2} marginTop="35px" justifyContent="space-between" paddingLeft="25px">
    <Grid sx={{ mb: 2 }} item xs={12}>
      <h1>Dashboard</h1>
    </Grid>
    {/* Admin Dashboard Cards */}
    <Grid item xs={12} sm={3.5} sx={{display: localStorage.getItem("Role") == "admin" ? "block" : "none"}}>
      <Card style={{ marginBottom: '10px', height:"125px", borderRadius:"15px"  }}>
        <CardContent sx={{display:"flex", justifyContent:"space-between"  }}>
          <Typography sx={{ml:1, fontWeight:"bold"}} variant="h5">Processed PDF</Typography>                 
          <Typography sx={{ml:1, fontSize:"20px", fontWeight:"bold"}} variant="h5">{PdfCount.processed_pdf}</Typography>                 
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={3.5} sx={{display: localStorage.getItem("Role") == "admin" ? "block" : "none"}}>
      <Card style={{ marginBottom: '10px', height:"125px", borderRadius:"15px" }}>
        <CardContent sx={{display:"flex", justifyContent:"space-between"  }}>
          <Typography sx={{ml:1, fontWeight:"bold"}} variant="h5">Partially Completed Documents</Typography>                 
          <Typography sx={{ml:1, fontSize:"20px", fontWeight:"bold"}} variant="h5">{PdfCount.partially_completed_documents}</Typography>                 
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={3.5} sx={{display: localStorage.getItem("Role") == "admin" ? "block" : "none"}}>
      <Card style={{ marginBottom: '10px', height:"125px", borderRadius:"15px" }}>
        <CardContent sx={{display:"flex", justifyContent:"space-between"  }}>
          <Typography sx={{ml:1, fontWeight:"bold"}} variant="h5">Completed Documents</Typography>                 
          <Typography sx={{ml:1, fontSize:"20px", fontWeight:"bold"}} variant="h5">{PdfCount.completed_documents}</Typography>                 
        </CardContent>
      </Card>
    </Grid>


    {/* Employee Dashboard Cards */}
    <Grid sx={{ mb: 2 }} item xs={12}>
      <h3 style={{display: localStorage.getItem("Role") == "admin" ? "block" : "none"}}>Employee Tasks</h3>
    </Grid>

    <Grid item xs={12} sm={3} >
      <Card style={{ marginBottom: '10px', height:"125px", borderRadius:"15px", transition: "background-color 0.3s ease", "&:hover": {
                    backgroundColor: "red", } }}>
        <CardContent sx={{display:"flex", justifyContent:"space-between"  }}>
          <Typography sx={{ml:1, fontWeight:"bold"}} variant="h5">Task Assigned</Typography>                 
          <Typography sx={{ml:1, fontSize:"20px", fontWeight:"bold"}} variant="h5">{TaskCounts.total_count}</Typography>                 
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={3} >
      <Card style={{ marginBottom: '10px', height:"125px", borderRadius:"15px" }}>
        <CardContent sx={{display:"flex", justifyContent:"space-between"  }}>
          <Typography sx={{ml:1, fontWeight:"bold"}} variant="h5">Task in Progress</Typography>                 
          <Typography sx={{ml:1, fontSize:"20px", fontWeight:"bold"}} variant="h5">{TaskCounts.progress}</Typography>                 
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={3} >
      <Card style={{ marginBottom: '10px', height:"125px", borderRadius:"15px" }}>
        <CardContent sx={{display:"flex", justifyContent:"space-between",   }}>
          <Typography sx={{ml:1, fontWeight:"bold"}} variant="h5">Tasks completed</Typography>                 
          <Typography sx={{ml:1, fontSize:"20px", fontWeight:"bold"}} variant="h5">{TaskCounts.completed}</Typography>                 
        </CardContent>
      </Card>
    </Grid>
    {/* end of container */}
  </Grid>

  useEffect(() => {
    if (localStorage.getItem("Role") == "admin"){
      PDFcount()
      TaskCount()
    }
    
  }, []);

  return (
         AdminDash
  )
}
