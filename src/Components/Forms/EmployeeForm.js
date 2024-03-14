import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Axios from '../../AxiosInstance';
import { useNavigate,useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EmployeeForm() {

  const [EmployeeName, setEmployeeName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState("");
  const [ShowConfirm, setShowConfirm] = useState("");
  const [disable, setDisable] = useState(false);

  const [Error, setError] = useState({
    name : false,
    phone : false,
    email : false,
    pass : false,
    confirm : false
  });
  const navigate = useNavigate();
  const params = useParams();

  const phoneregex = /^\d{10}$/;
  const passregex = /^.{8,}$/;
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // APIs
  const post = () =>{
      Axios.post("employee_details/add_emp", PostData).then((res)=>{
        console.log(res);
        if(res.data.status == "success"){
            navigate("/employee")
        }
      }).catch(err =>{
        Swal.fire({
          title:err,
          icon:"error",

        })
      })
  };

  const view = () =>{
    Axios.get("employee_details/emp_details?emp_id="+params.ID).then(res =>{
      setEmployeeName(res.data.data.name ? res.data.data.name : "") 
      setPassword(res.data.data.password ? res.data.data.password : "")
      setConfirmPassword(res.data.data.password ? res.data.data.password : "")
      setEmail(res.data.data.email ? res.data.data.email : "") 
      setPhoneNumber(res.data.data.phone_number ? res.data.data.phone_number : "") 
    }).catch(err =>{
      Swal.fire({
        title: err,
        icon:"error"
      })
    })
  }

  const update = () =>{
    Axios.patch("employee_details/update_employee", UpdateData).then(res =>{
      if(res.statusText == "OK"){
        Swal.fire({
          title:"Updated Successfully",
          icon:"success"
        })
        navigate("/employee")
      }
    }).catch(err =>{
      Swal.fire({
        title: err,
        icon:"error",
      })
    })
  }

  // Datas
  const PostData = {
    emp_id:"", name: EmployeeName, email: Email, phone_number : PhoneNumber, password: Password, created_by: localStorage.getItem("Name"),role:"", created_at: Date.now(), modified_on: Date.now()
  };

  const UpdateData = {
    emp_id:"", name: EmployeeName, email: Email, phone_number : PhoneNumber, password: Password, created_by: "",role:"", created_at: Date.now(), modified_on: Date.now()
  };

  // Onclick Functions
  const onSubmitClick = () =>{
    const FormError = {
      name : EmployeeName.trim() === "" ? true : false,
      phone : PhoneNumber === "" ? true : !(phoneregex.test(PhoneNumber)) ? "wrong" : false,
      email : Email.trim() === "" ? true : !(emailregex.test(Email)) ? "wrong" : false,
      pass : Password.trim() === "" ? true : !(passregex.test(Password)) ? "wrong" : false,
      confirm : ConfirmPassword.trim() === "" ? true : (ConfirmPassword != Password) ? "wrong" : false
    }
    setError(FormError)
    if (Object.values(FormError).some(val => val === true || val === "wrong")){
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

  const onBackClick = () =>{
    navigate("/employee")
  };

  const handleTogglePassword = (e)=>{
    setShowPassword(!ShowPassword)
  };
  const handleToggleShowPassword = (e)=>{
    setShowConfirm(!ShowConfirm)
  };

  useEffect(() =>{
    if(params.action == "update"){
      view()
      setDisable(true)
    }
  }, [])

  return (
    <div style={{ height:"90vh", background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)'}}>
      <Grid container sx={{px:2,paddingTop:8 } } rowGap={3} columnGap={5} paddingLeft={5} paddingTop={3} justifyContent="center">
        <Grid item xs={12} sm={6} sx={{textAlign: "center",}}>
          <h1>Employee Form</h1>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Employee Name" error={Error.name} helperText={Error.name === "wrong" ? "Name should have" :Error.name ? "Employee Name cannot be empty" :  ""} value={EmployeeName} size='small' fullWidth onChange={(e => setEmployeeName(e.target.value))} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField disabled={disable} type={ShowPassword ? "text" : "password"} label="Password" error={Error.pass} helperText={Error.pass === "wrong" ? "Password should have 8 characters" : Error.pass ? "Password cannot be empty" : ""} value={Password} size='small' fullWidth onChange={(e)=>setPassword(e.target.value)} InputProps={{endAdornment: ( <IconButton disabled={disable} disableRipple onClick={handleTogglePassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> ) }} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField disabled={disable} type={ShowConfirm ? "text" : "password"} label="Confirm Password" error={Error.confirm} helperText={Error.confirm === "wrong" ? "Confirm Password should be same as Password" : Error.confirm ? "Confirm Password cannot be empty" : ""} value={ConfirmPassword} size='small' fullWidth onChange={(e)=>setConfirmPassword(e.target.value)} InputProps={{endAdornment: ( <IconButton disabled={disable} disableRipple onClick={handleToggleShowPassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> )}} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' disabled={disable} label="Email" error={Error.email} helperText={Error.email === "wrong" ? "Entered email is not a valid email"  :Error.email ? "Email field cannot be empty" :  ""} value={Email} size='small' fullWidth onChange={(e)=>setEmail(e.target.value)} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Phone Number" error={Error.phone} helperText={Error.phone === "wrong" ? "Enter a vaild Phone Number"  :Error.phone ? "Phone Number field cannot be empty" :  ""} value={PhoneNumber} size='small' fullWidth onChange={(e)=>setPhoneNumber(e.target.value)} />
        </Grid>
      </Grid>
        <Box sx={{display:"flex", justifyContent:"center", pt:2}}>
          <Button variant='contained' disableRipple disableElevation onClick={onSubmitClick}>
            {params.action == "create" ? "Create" :params.action == "update" ? "Update" :"" } 
          </Button>
          <Button variant='contained' disableRipple disableElevation onClick={onBackClick} style={{backgroundColor:"red", color:"white", marginLeft:"10px"}}>Cancel</Button>
        </Box>
    </div>
  )
}
