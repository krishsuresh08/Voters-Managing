import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MyRouter from '../../Routes/Router';
import MiniDrawer from '../Menubar/Sidebar';
import Navbar from '../Menubar/Topbar';
import LoginForm from '../Forms/LoginForm';

function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <Grid container>
      {
        // (!["/auth/signin"].includes(location.pathname) && localStorage.getItem("token")) ?
        (!["/auth/login"].includes(location.pathname))  ?
            <React.Fragment>
                <Grid item md={2.8} lg={2} sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
                    <MiniDrawer open={open} setOpen={setOpen} />
                </Grid>
                <Grid item xs={12} md={9.2} lg={10} >
                    <Grid container>
                        <Grid item xs={12} sx={{ position: "sticky", top: 0, backgroundColor: "#FFF", zIndex: 99 }}>
                            <Navbar user={true} open={open} setOpen={setOpen} />
                        </Grid>
                        <Grid item xs={12} >
                            <MyRouter />
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
            :
            // (localStorage.getItem("Role" == "admin" || localStorage.getItem("Role" == "employee")))
            <Grid item xs={12}>
                <LoginForm />
            </Grid>
      }

    </Grid>
  )
}

export default Layout