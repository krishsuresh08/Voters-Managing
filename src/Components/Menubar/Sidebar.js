import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';
import { Collapse, Drawer } from '@mui/material';
import Logo from "../../Assets/Images/Logo/download-.png";
import { AdminJSON, EmployeeJSON } from '../../Assets/JSON/sideBarJSON';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function MiniDrawer({ open, setOpen }) {
    
    const location = useLocation();
    const [childOpen, setchildOpen] = useState("");

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNavClick = (openMenu) => {
      setchildOpen(openMenu)
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* drawer */}
            <Drawer sx={{ width: "inherit", display: { xs: 'block', md: 'none' }, flexShrink: 0, '& .MuiDrawer-paper': { width: "inherit", zIndex: 9999999999, boxSizing: 'border-box', backgroundColor: "#6FA8DC" }, }}
            variant="temporary" anchor="left" onClose={() => setOpen(false)} open={open}>
                <DrawerHeader>
                    <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
                        <Toolbar sx={{ backgroundImage: `url${Logo}`, color: "#FFF", textAlign: "center", width:"100%", }}>
                            <img alt='Logo' src={Logo} />        
                        </Toolbar>
                    </Link>
                    <IconButton sx={{ color: "#FFF", p: "3px 5px" }} onClick={handleDrawerClose}>
                        <i className="bi bi-x"></i>
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ "backgroundColor": "#FFF" }} />
                <List sx={{ padding: "10px" }}>
                    {
                    ((localStorage.getItem("Role") == "admin") ? AdminJSON : EmployeeJSON).map((val, index) => (
                        <Link key={index} className="navLinks" to={val.path} style={{ color: "#FFF", textDecoration: "none" }} onClick={() => handleNavClick(val.openMenu)} >
                            <ListItem disablePadding disableRipple sx={{ display: 'block' }}>
                                <ListItemButton className={(val.path == location.pathname || location.pathname.includes(val.path)) ? "active" : ""} 
                                    sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center',  px: 2.5, mb: 1 }} >
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }} >
                                        <i className={val.icon} style={{ color: val.path == location.pathname ? "#000" : "#FFF" }}></i>
                                    </ListItemIcon>
                                    <ListItemText primary={val.comp} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={childOpen == val.openMenu} timeout="auto" unmountOnExit>
                                {
                                val.children && val.children.map((val, ind) => {
                                    return (
                                        <Link key={ind} className="navLinks" to={val.path} style={{ textDecoration: "none", color: "#FFF" }}>
                                            <List component="div" disablePadding>
                                                <ListItem className={(val.path == location.pathname || location.pathname.includes(val.path)) ? "active" : ""} >
                                                    <ListItemIcon>
                                                        <i className={val.icon} style={{ color: val.path == location.pathname ? "#000" : "#FFF" }}></i>
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ pl: "10px" }} primary={val.comp} />
                                                </ListItem>
                                            </List>
                                        </Link>
                                        )
                                    })
                                }
                            </Collapse>
                        </Link>
                        ))
                    }
                </List>
            </Drawer>
            {/* permanent drawer */}
            <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: { md: "23.4%", lg: "16.7%" }, position: "fixed", backgroundColor: "#6FA8DC", overflow: "hidden" }, }} open={true} >
                <DrawerHeader>
                    <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
                        <Toolbar sx={{ backgroundImage: `url${Logo}`, color: "#FFF", textAlign: "center", width:"100%" }}>
                            <img alt='Logo' src={Logo} />        
                        </Toolbar>
                    </Link>
                </DrawerHeader>
                <Divider sx={{ "backgroundColor": "#FFF" }} />
                <List sx={{ padding: "10px" }}>
                    {((localStorage.getItem("Role") == "admin") ? AdminJSON : EmployeeJSON).map((val, index) => (
                        <Link key={index} className="navLinks" to={val.path} style={{ textDecoration: "none", color: "#FFF" }} onClick={() => handleNavClick(val.openMenu)} >
                            <ListItem disablePadding disableRipple sx={{ display: 'block' }}>
                                <ListItemButton disableRipple className={(val.path == location.pathname || location.pathname.includes(val.path)) ? "active" : ""} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, mb: 1 }} >
                                    <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center', }}>
                                        <i className={val.icon} style={{ color: val.path == location.pathname || location.pathname.includes(val.path) ? "#000" : "#FFF" }}></i>
                                    </ListItemIcon>
                                    <ListItemText primary={val.comp} />
                                </ListItemButton>
                            </ListItem>
                            <Collapse in={childOpen == val.openMenu} timeout="auto" unmountOnExit>
                                {
                                    val.children && val.children.map((val, ind) => {
                                        return (
                                            <Link key={ind} className="navLinks" to={val.path} style={{ textDecoration: "none", color: "#FFF" }}>
                                                <List component="div" disablePadding>
                                                    <ListItem className={(val.path == location.pathname || location.pathname.includes(val.path)) ? "active" : ""}  >
                                                        <ListItemIcon sx={{ justifyContent: "center" }}>
                                                            <i className={val.icon} style={{ color: val.path == location.pathname ? "#000" : "#FFF" }}></i>
                                                        </ListItemIcon>
                                                        <ListItemText primary={val.comp} />
                                                    </ListItem>
                                                </List>
                                            </Link>
                                        )
                                    })
                                }
                            </Collapse>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </Box >
    );
}