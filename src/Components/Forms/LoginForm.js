import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined} from '@mui/icons-material';
import React, { useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Axios from "../../AxiosInstance";
import Swal from 'sweetalert2';
import { wait } from '@testing-library/user-event/dist/utils';

export default function LoginForm() {

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);

    const [Error, setError] = useState({
        username : false,
        password : false,
    });

    let navigate = useNavigate();

    const handleSubmit = ()=>{
      const ValidateUser = {
          username: UserName === "" ? true : '',
          password: Password === "" ? true :"",
      }
      setError(ValidateUser)
      // if (UserName !== "" && Password !== "") {
      //     if (Object.values(ValidateUser).some(val => val == true )){
      //     }
      //     else{
      //       if (UserName == "test@example.com" && Password == "12345678"){
      //         localStorage.setItem("Name", "name");
      //         localStorage.setItem("Role", "admin");
      //         localStorage.setItem("Token", "res.data.access_token");
              
      //         navigate('/dashboard')
      //       }
      //     }              
      // }
      if ((UserName !== "" && Password !== "") && (Object.values(ValidateUser).some(val => val != "wrong"))) {
        Axios.post("/auth/signin", {email: UserName, password: Password}).then((res) =>{
          if (res.data.detail == "Password must be at least 8 characters long"){
            setError({...Error,password:"wrong"})
          }
          else{
            if (res.data){
              localStorage.setItem("Name", res.data.name);
              localStorage.setItem("Role", res.data.role);
              localStorage.setItem("Token", res.data.access_token);
              navigate('/dashboard')
            }
            else if(res.data.detail == "Password must be at least 8 characters long") {
              console.log("herr");
              Swal.fire({
                text: "Password must be atleast 8 characters",
                title:"Try Again!!",
                timer: 1500,
                showConfirmButton: false,
                icon: "warning"
              })
            }
          }              
        }).catch(err =>{
          console.log(err.response.data);
          if(err.response.data.detail == "Incorrect Password"){
            Swal.fire({
              text:"Email or Password is incorrect",
              title:"Try Again!!",
              timer: 1500,
              showConfirmButton:false,
              icon: "warning"
            })
          }
          else if((err.response.data.detail[0].msg == "value is not a valid email address") || (err.response.data.detail == "Incorrect Email") ) {
            Swal.fire({
              text: "User not Found with provided details",
              title:"Try Again!!",
              timer: 1500,
              showConfirmButton: false,
              icon: "warning"
            })
          }
        }) 
      }
    };

    const handleTogglePassword = (e)=>{
      setShowPassword(!ShowPassword)
    };

  return (
    <div>
            <Grid container sx={{backgroundColor:"#d9ead3", p:3, display :"flex", justifyContent:"center",alignItems:"center", height:"100vh" }}>
                <Grid item xs={12} md={6} sx={{backgroundColor:"white", borderRadius:"20px", p:3}} >
                    <Box>
                        <Typography variant='h3' sx={{fontWeight:"bold", pb:2}}>Login</Typography>
                        <Box sx={{pt:3}} >
                          <Typography sx={{py:1}}>Enter your Username</Typography>
                          <TextField placeholder='username' error={Error.username} helperText={Error.username == "wrong" ? "Enter valid username" : Error.username ? "User Name is required"  :""} value={UserName} onChange={(e)=> setUserName(e.target.value)} fullWidth type='text' size='small' />
                        </Box>
                        <Box sx={{pt:2}}>
                          <Typography sx={{py:1}}>Enter your Password</Typography>
                          <TextField placeholder='atleast 8 characters' error={Error.password} helperText={ Error.password == "wrong" ? "password must have 8 characters" : Error.password ? "Password is required" : ""} value={Password} onChange={(e)=> setPassword(e.target.value)} fullWidth type={ShowPassword ? "text" : "password"} size='small' InputProps={{endAdornment: ( <IconButton disableRipple onClick={handleTogglePassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> ), }} />
                        </Box>
                        <Button fullWidth disableElevation disableRipple size='large' style={{marginRight:"10px", backgroundColor:"	#0b5394", marginTop:"15px"}} variant='contained' onClick={handleSubmit}>Login</Button>
                    </Box>
                </Grid>
                {/* <Grid item md={6} sx={{display:{md:"flex", xs:"none"}, justifyContent:"center"}}>
                    <img src={LoginImage} width="80%" height="100%" alt='login Image'/>
                </Grid> */}
            </Grid>
    </div>
  ) 
}
