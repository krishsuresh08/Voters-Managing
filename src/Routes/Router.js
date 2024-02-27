import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from '../Pages/dashboard';
import EmployeeForm from '../Components/Forms/EmployeeForm';
import Employee from '../Pages/EmployeePage';
import LoginForm from '../Components/Forms/LoginForm';
import { Box } from '@mui/material';
import PDF from '../Pages/pdf';
import SeperatePDF from '../Pages/SeperatePDF';

function MyRouter() {

    const location = useLocation();

    return (
        <Box>
            {
                location.pathname !== "/auth/login" && localStorage.getItem("Role") === "admin" ?
                <Routes>
                    <Route path='/dashboard' index element = {<Dashboard/>} />
                    <Route path="/" element = {<Navigate to="/dashboard" />} />
                    <Route path='/employee' element = {<Employee/>} />
                    <Route path='/employee/create' element = {<EmployeeForm/>} />
                    <Route path='/pdf' element = {<PDF/>} />
                    <Route path='/pdf_list' element = {<SeperatePDF/>} />
                </Routes>
                :
                location.pathname !== "/auth/login" && localStorage.getItem("Role") == "employee" ? 
                <Routes>
                    <Route path='/dashboard' element = {<Dashboard />} />
                    <Route path='/pdf' element = {<PDF/>} />
                </Routes>
                :
                ((localStorage.getItem("Role") == "admin" ) || (localStorage.getItem("Role") == "admin" ) ) && location.pathname == "/auth/login" ?
                <Navigate to="/dashboard"  />
                :
                (<Routes>
                    <Route path='/auth/login' element={<LoginForm />} />
                    <Route path="*" element={<Navigate to="/auth/login" />} />
                </Routes>)
            }

        </Box>
    )
}

export default MyRouter;
