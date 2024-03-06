import React, { useEffect, useState } from "react";
import {  Box, Button, IconButton, Toolbar, Tooltip, Typography,} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";

function Navbar({ open, setOpen, user }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const Open = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Log out",
        icon: "question",
        showCancelButton:true,
        confirmButtonText:"Yes, Logout",
        confirmButtonColor:"red"
      })
      .then((logOut) => {
        if (logOut.isConfirmed) {
            setAnchorEl(null);
            localStorage.clear();
            navigate("/auth/signin");
        } 
        else if(logOut.isDismissed){
          Swal.fire({
            title:"you are not logged out",
            icon:"info",
            showConfirmButton:false,
            timer: 750
          })
        }
      });
  };

  useEffect(() => {
  }, []);

  return (
    <AppBar position="sticky" open={open} elevation={1} sx={{ color: "black", backgroundColor: "#6FA8DC", top: 0 }}  >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <IconButton color="white" aria-label="open drawer" sx={{ display: { xs: "flex", md: "none" } }} onClick={handleDrawerOpen} edge="start" >
              <MenuIcon sx={{color:"white"}} />
            </IconButton>
          ) : (
            ""
          )}
          <Typography variant="h6" noWrap component="h6" sx={{ fontSize: { xs: "16px", md: "18px" }, fontStyle:"italic", fontWeight:"bold", color:"white" }} >
            Welcome {localStorage.getItem("Name")}!
          </Typography>
        </Box>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Logout">
            <Button variant="contained" endIcon={<LogoutIcon/>} sx={{fontSize:"15px", px:1}} onClick={logOut}/>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
