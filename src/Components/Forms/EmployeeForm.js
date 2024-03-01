import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import Axios from '../../AxiosInstance';
import { useNavigate,useParams } from 'react-router-dom';

export default function EmployeeForm() {

  const [EmployeeName, setEmployeeName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState("");
  const [ShowConfirm, setShowConfirm] = useState("");

  const [Error, setError] = useState({
    name : false,
    phone : false,
    email : false,
    pass : false,
    confirm : false
  });
  const navigate = useNavigate();
  const params = useParams();

  const PostData = {
    emp_id:"", name: EmployeeName, email: Email, phone_number : PhoneNumber, password: Password, created_by: localStorage.getItem("Name"),role:"", created_at: Date.now(), modified_on: Date.now()
  };

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
        alert(err)
      })
  };

  // Submit Action

  const onSubmitClick = () =>{
    const FormError = {
      name : EmployeeName.trim() === "" ? true : false,
      phone : PhoneNumber === "" ? true : !(phoneregex.test(PhoneNumber)) ? "wrong" : false,
      email : Email.trim() === "" ? true : !(emailregex.test(Email)) ? "wrong" : false,
      pass : Password.trim() === "" ? true : !(passregex.test(Password)) ? "wrong" : false,
      confirm : ConfirmPassword.trim() === "" ? true : (ConfirmPassword != Password) ? "wrong" : false
    }
    setError(FormError)
    if (Object.values(Error).some(val => val === true || val === "wrong")){
    }
    else{
      post()
    }
  };

  // Onclick Functions

  const onBackClick = () =>{
    navigate("/employee")
  };

  const handleTogglePassword = (e)=>{
    setShowPassword(!ShowPassword)
  };
  const handleToggleShowPassword = (e)=>{
    setShowConfirm(!ShowConfirm)
  };

  return (
    <div style={{ height:"100vh"}}>
      <Grid container sx={{p:2,mt:5 } } rowGap={3} columnGap={5} paddingLeft={5} paddingTop={3} justifyContent="center">
        <Grid item xs={12} sm={6} sx={{textAlign: "center"}}>
          <h1>Employee Form</h1>
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Employee Name" error={Error.name} helperText={Error.name === "wrong" ? "Name should have" :Error.name ? "Employee Name cannot be empty" :  ""} value={EmployeeName} size='small' fullWidth onChange={(e)=>setEmployeeName(e.target.value)} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type={ShowPassword ? "text" : "password"} label="Password" error={Error.pass} helperText={Error.pass === "wrong" ? "Password should have 8 characters" : Error.pass ? "Password cannot be empty" : ""} value={Password} size='small' fullWidth onChange={(e)=>setPassword(e.target.value)} InputProps={{endAdornment: ( <IconButton disableRipple onClick={handleTogglePassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> ) }} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type={ShowConfirm ? "text" : "password"} label="Confirm Password" error={Error.confirm} helperText={Error.confirm === "wrong" ? "Confirm Password should be same as Password" : Error.confirm ? "Confirm Password cannot be empty" : ""} value={ConfirmPassword} size='small' fullWidth onChange={(e)=>setConfirmPassword(e.target.value)} InputProps={{endAdornment: ( <IconButton disableRipple onClick={handleToggleShowPassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> )}} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Email" error={Error.email} helperText={Error.email === "wrong" ? "Entered email is not a valid email"  :Error.email ? "Email field cannot be empty" :  ""} value={Email} size='small' fullWidth onChange={(e)=>setEmail(e.target.value)} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField type='text' label="Phone Number" error={Error.phone} helperText={Error.phone === "wrong" ? "Enter a vaild Phone Number"  :Error.phone ? "Phone Number field cannot be empty" :  ""} value={PhoneNumber} size='small' fullWidth onChange={(e)=>setPhoneNumber(e.target.value)} />
        </Grid>
      </Grid>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <Button variant='contained' disableRipple disableElevation onClick={onSubmitClick}>Submit</Button>
          <Button variant='contained' disableRipple disableElevation onClick={onBackClick} style={{backgroundColor:"red", color:"white"}}>Cancel</Button>
        </Box>
    </div>
  )
}
