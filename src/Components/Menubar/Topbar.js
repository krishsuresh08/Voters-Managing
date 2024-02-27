import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography,} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../AxiosInstance";
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";
// import { toast } from "react-toastify";

function Navbar({ open, setOpen, user }) {
  const navigate = useNavigate();
  const [profile, setprofile] = useState("");
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
//   const getDetails = () => {
//     Axios.get(`user/${localStorage.getItem("userid")}`)
//       .then((res) => {
//         const { status, message } = res.data;
//         if (status) {
//           setprofile(message["profile"] ? message["profile"] : "");
//         } else {
//           toast.error(message);
//         }
//       })
//       .catch((err) => {
//         if (err?.response) {
//           const { data } = err?.response;
//           toast.error(data.message);
//         } else {
//           toast.error("Internal Server Error");
//         }
//       });
//   };

  useEffect(() => {
    // getDetails();
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
          {/* <Avatar src={profile} className="rounded-circle" onClick={handleClick} style={{ width: "35px", cursor: "pointer", height: "35px" }} alt="Avatar" /> */}
        </div>
      </Toolbar>
      {/* <Menu id="basic-menu" anchorEl={anchorEl} open={Open} onClose={handleClose} MenuListProps={{ "aria-labelledby": "basic-button",  }} >
        {localStorage.getItem("role") == "User" ? (
          <Link
            to={`/chat/${localStorage.getItem("userid")}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <MenuItem onClick={handleClose}>Back to Conversation</MenuItem>
          </Link>
        ) : (
          ""
        )}
        <Link to="/setting/myprofile" style={{ color: "inherit", textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Link>
        <Link to="/changepassword"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <MenuItem onClick={handleClose}>Change Password</MenuItem>
        </Link>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu> */}
    </AppBar>
  );
}

export default Navbar;
