import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../../AxiosInstance';
import Swal from 'sweetalert2';
import moment from 'moment';

export default function TasksForm() {

    const [empid, setEmpid] = useState("");
    const [taskid, setTaskid] = useState("");
    const [empName, setEmpName] = useState("");
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("");
    const [pdf, setPDF] = useState("");
    const [status, setStatus] = useState("");
    const [created_by, setcreated_by] = useState("");
    const [created_on, setcreated_on] = useState("");
    const [due, setDue] = useState(" ");

    const [Error, setError] = useState({
        desc : false,
        pdf : false,
        priority : false,
        date: false,
        status: false,
    });

    const navigate = useNavigate();
    const params = useParams();
    const postData = {
        task_id:"", emp_id:empid, name: empName, description: task, priority, status: status, pdf_name: pdf, due_date:new Date(due), created_on: Date.now(), created_by: localStorage.getItem("Name"), modified_by:"", modified_on: Date.now()
    };
    const updatedata = {
        task_id: "", emp_id:empid, name: empName, description: task, priority, status: status, pdf_name: pdf, due_date:new Date(due), created_on: Date.now(), modified_on: Date.now(), modified_by: localStorage.getItem("Name"), created_by: created_by
    };

    // APIs
    const post = () =>{
        Axios.post("task/assign_task", postData).then((res)=>{
            if(res.data.status == "success"){
                navigate("/tasks")
            }}).catch(err =>{
              Swal.fire({
                title: err,
                icon:"error",
                timer: 1600
              })
            })
    };

    const update = ()=>{
      Axios.patch("task/update_task?task_id="+params.ID, updatedata).then(res =>{
        if(res.statusText == "OK"){
          Swal.fire({
            title:res.data.message,
            icon:"success"
          })
          navigate("/tasks")
        }
      }).catch(err =>{
        Swal.fire({
          title:err,
          icon:"error"
        })
      })
    }

    const view = () =>{
      Axios.get(`task/task_details?task_id=`+params.ID).then(res =>{
        if(res.statusText == "OK"){
          setTask(res.data.data.description ? res.data.data.description : "") 
          setTaskid(res.data.data.taskid ? res.data.data.taskid : "") 
          setEmpid(res.data.data.emp_id ? res.data.data.emp_id : "") 
          setEmpName(res.data.data.name ? res.data.data.name : "") 
          setPriority(res.data.data.priority ? res.data.data.priority : "") 
          setPDF(res.data.data.pdf_name ? res.data.data.pdf_name : "")
          setDue(res.data.data.due_date ? moment(res.data.data.due_date).format("YYYY-MM-DD") : " ")
          setStatus(res.data.data.status ? res.data.data.status : "")
          setcreated_on(res.data.data.created_on ? res.data.data.created_on : "")
          setcreated_by(res.data.data.created_by ? res.data.data.created_by : "")
        }
      }).catch(err =>{
        Swal.fire({
          title: err,
          text:"error during viewing tak detail",
          icon:"error"
        })
      })
    }

    // const ListPDF = () => {
    //     Axios.get('filter_details/list_pdf').then((res) => {
    //       setPDF([...res.data.collections]);
    //     }).catch(err => {
    //       Swal.fire({
    //         title:err,
    //         icon:"error",
    //       })
    //     });
    // };

    // onclick Functions
    const onCancelClick = () =>{
      if(params.action == "create") {
        navigate("/employee")
      }
      else if(params.action == "update" ){
         navigate("/tasks")
      }
    };

  const onSubmitClick = () =>{
    const FormError = {
      desc : task.trim() === "" ? true : false,
      pdf : pdf === "" ? true : false,
      priority : priority.trim() === "" ? true : false,
      date : due.trim() == ""|| due == null ?  true : false,
      status : status.trim() === "" ? true : false,
    }
    setError(FormError)
    if (Object.values(FormError).some(val => val === true)){
      console.log(FormError);
    }
    else{
      if(params.action == "update" ) {
        update()
      }
      else if(params.action == "create" ){
        post() 
      } 
    }
  };

    useEffect(() =>{
      // ListPDF()
      setEmpid(localStorage.getItem("clicked_emp_id")) 
      setEmpName(localStorage.getItem("clicked_emp_name")) 
      if(params.action == "update"){
        view()
      }
    }, [])

  return (
    <div style={{ height:"100vh"}}>
      <Grid container sx={{p:2,mt:5 } } rowGap={3} columnGap={5} paddingLeft={5} paddingTop={3} justifyContent="center">
        <Grid item xs={12} sm={6} sx={{textAlign: "center"}}>
          <h1>Assign Task</h1>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Task Description" size='small' value={task} error={Error.desc} helperText={Error.desc ? "Field is necessary" : ""} onChange={(e => setTask(e.target.value))} fullWidth  />
        </Grid>
  {/* <Grid item xs={12} sm={6}>
    <Autocomplete
      fullWidth
      options={pdf} // Assuming pdf is an array of options fetched from the database
      value={selectedPDF} // You need to maintain a state for the selected PDF
      onChange={(event, newValue) => setSelectedPDF(newValue)} // Update the selected PDF
      renderInput={(params) => (
        <TextField
          {...params}
          label="PDF Name"
          size="small"
          error={Error.pdf}
          helperText={Error.pdf ? "Field is necessary" : ""}
        />
      )}
    />
  </Grid> */}
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="PDF Name" size='small' fullWidth value={pdf} error={Error.pdf} helperText={Error.pdf ? "Field is necessary" : ""} onChange={(e => setPDF(e.target.value.split(",")))} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Priority" size='small' fullWidth value={priority} error={Error.priority} helperText={Error.priority ? "Field is necessary" : ""} onChange={(e => setPriority(e.target.value))} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Status" size='small' placeholder='completed / progress' fullWidth value={status} error={Error.status} helperText={Error.status ? "Field is necessary" : ""} onChange={(e => setStatus(e.target.value))} />
        </Grid>
        <Grid item sm={6} xs={12}>
            <TextField inputProps={{ max:"2024-12-31"}} type='date' label='Due Date' size='small' fullWidth value={due} error={Error.date} helperText={Error.date ? "Field is necessary" : ""} onChange={(e => setDue(e.target.value))} />
        </Grid>
      </Grid>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <Button variant='contained' disableRipple disableElevation onClick={onSubmitClick}>
            {params.action == "create" ? "Create" :params.action == "update" ? "Update" :"" }
            </Button>
          <Button variant='contained' disableRipple disableElevation onClick={onCancelClick} style={{backgroundColor:"red", color:"white"}}>Cancel</Button>
        </Box>
    </div>
  )
}
