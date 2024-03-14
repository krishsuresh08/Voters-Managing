import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import EmployeeForm from '../Components/Forms/EmployeeForm';
import Employee from '../Pages/EmployeePage';
import LoginForm from '../Components/Forms/LoginForm';
import { Box } from '@mui/material';
import PDF from '../Pages/pdf';
import SeperatePDF from '../Pages/SeperatePDF';
import Tasks from '../Pages/Tasks';
import TasksForm from '../Components/Forms/TasksForm';
import PDFform from '../Components/Forms/PdfForm';
import CDashboard from '../Pages/CDashboard';

function MyRouter() {

    const location = useLocation();

    return (
        <Box>
            {
                location.pathname !== "/auth/login" && localStorage.getItem("Role") === "admin" ?
                <Routes>
                    {/* <Route path='/dashboard' index element = {<Dashboard/>} /> */}
                    <Route path='/dashboard' index element = {<CDashboard/>} />
                    <Route path="/" element = {<Navigate to="/dashboard" />} />
                    <Route path='/employee' element = {<Employee/>} />
                    <Route path='/employee/:action' element = {<EmployeeForm/>} />
                    <Route path='/employee/:action/:ID' element = {<EmployeeForm/>} />
                    <Route path='/pdf' element = {<PDF/>} />
                    <Route path='/pdf_list' element = {<SeperatePDF/>} />
                    <Route path='/pdf/:action' element = {<PDFform/>} />
                    <Route path='/tasks' element = {<Tasks/>} />
                    <Route path='/employee/task/:action' element = {<TasksForm/>} />
                    <Route path='/employee/task/:action/:ID' element = {<TasksForm/>} />
                </Routes>
                :
                location.pathname !== "/auth/login" && localStorage.getItem("Role") == "Employee" ? 
                <Routes>
                    <Route path='/dashboard' index element = {<CDashboard/>} />
                    <Route path="/" element = {<Navigate to="/dashboard" />} />
                    <Route path='/pdf' element = {<PDF/>} />
                    <Route path='/pdf_list' element = {<SeperatePDF/>} />
                    <Route path='/pdf/update' element = {<PDFform/>} />
                    <Route path='/tasks' element = {<Tasks/>} />
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
