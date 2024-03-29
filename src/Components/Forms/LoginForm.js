import { Box, Button, CircularProgress, Grid, IconButton, TextField, Typography } from '@mui/material';
import { VisibilityOutlined, VisibilityOffOutlined} from '@mui/icons-material';
import React, { useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';
import Axios from "../../AxiosInstance";
import Swal from 'sweetalert2';

export default function LoginForm() {

    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [ShowPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [Error, setError] = useState({
        username : false,
        password : false,
    });

    // const Sess = () =>{
    //   Axios.interceptors.request.use(
    //     (confg)
    //   )
    // }

    let navigate = useNavigate();

    const handleSubmit = ()=>{
      const ValidateUser = {
          username: UserName === "" ? true : '',
          password: Password === "" ? true : Password.length <= 7 ? "wrong" : "",
      }
      setError(ValidateUser)

      if ((UserName !== "" && Password !== "") && (Object.values(ValidateUser).every(val => val !== "wrong"))) {
        setLoading(true)
        Axios.post("/auth/signin", {email: UserName, password: Password}).then((res) =>{
          setLoading(false)
          if (res.data.detail == "Password must be at least 8 characters long"){
            setError({...Error,password:"wrong"})
            setLoading(false)
          }
          else{
            if (res.data){
              setLoading(false)
              localStorage.setItem("Name", res.data.name);
              localStorage.setItem("Role", res.data.role);
              localStorage.setItem("Token", res.data.access_token);
              res.data.emp_id && localStorage.setItem("EmpID", res.data.emp_id);
              navigate('/dashboard')
            }
          }              
        }).catch(err =>{
          if(err.response.data){
            setLoading(false)
            if(err.response.data.detail == "Incorrect Password"){
              Swal.fire({
                title:"Password is incorrect",
                text:"Try Again!!",
                timer: 1500,
                showConfirmButton:false,
                icon: "warning"
              })
            }
            else if((err.response.data.detail[0].msg == "value is not a valid email address") ) {
              setLoading(false)
              Swal.fire({
                title: "value is not a valid email address",
                text:"Try Again!!",
                timer: 1500,
                showConfirmButton: false,
                icon: "warning"
              })
            }
            else if (err.response.data.detail == "Incorrect Email"){
              setLoading(false)
              Swal.fire({
                title: "Incorrect Email",
                text:"Try Again!!",
                timer: 1500,
                showConfirmButton: false,
                icon: "warning"
              })             
            }
        }
        else{
          setLoading(false)
          Swal.fire({
            title:"Database not connected",
            icon:"error",
          })
        }
        }) 
      }
    };

    const handleTogglePassword = (e)=>{
      setShowPassword(!ShowPassword)
    };

    useEffect(()=>{
      
    },[])

  return (
    <div>
      <Grid container sx={{background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)', p:3, display :"flex", justifyContent:"center",alignItems:"center", height:"100vh" }}>
        <Grid item xs={12} md={4} sx={{background:"white",borderRadius:"20px", p:3}} >
          <Box>
            <Typography variant='h3' sx={{fontWeight:"bold", pb:2}}>Login</Typography>
            <Box sx={{pt:3}} >
              <Typography sx={{py:1}}>Enter your Email</Typography>
              <TextField placeholder='something@example.com' error={Error.username} helperText={Error.username == "wrong" ? "Enter valid username" : Error.username ? "User Name is required"  :""} value={UserName} onChange={(e)=> setUserName(e.target.value)} required fullWidth type='email' autoFocus  size='small' />
            </Box>
            <Box sx={{pt:2}}>
              <Typography sx={{py:1}}>Enter your Password</Typography>
              <TextField placeholder='atleast 8 characters' error={Error.password} helperText={ Error.password == "wrong" ? "password must have 8 characters" : Error.password ? "Password is required" : ""} value={Password} onChange={(e)=> setPassword(e.target.value)} fullWidth autoComplete='12345678' type={ShowPassword ? "text" : "password"} size='small' InputProps={{endAdornment: ( <IconButton disableRipple onClick={handleTogglePassword}> {ShowPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />} </IconButton> ), }} />
            </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 2 }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button fullWidth disableElevation disableRipple size='large' style={{ marginRight: "10px", backgroundColor: "#4dafff", marginTop: "15px" }} variant='contained' onClick={handleSubmit}>Login</Button>
                )}
              </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  ) 
};
