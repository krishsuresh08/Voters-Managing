import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from '../Pages/dashboard';
import EmployeeForm from '../Components/Forms/EmployeeForm';
import Employee from '../Pages/EmployeePage';
import LoginForm from '../Components/Forms/LoginForm';
import { Box } from '@mui/material';
import PDF from '../Pages/pdf';
import SeperatePDF from '../Pages/SeperatePDF';
import Tasks from '../Pages/Tasks';
import TasksForm from '../Components/Forms/TasksForm';
import PDFform from '../Components/Forms/PdfForm';

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
                    <Route path='/employee/action/:action' element = {<EmployeeForm/>} />
                    <Route path='/pdf' element = {<PDF/>} />
                    <Route path='/pdf_list' element = {<SeperatePDF/>} />
                    <Route path='/pdf/:action' element = {<PDFform/>} />
                    <Route path='/tasks' element = {<Tasks/>} />
                    <Route path='/employee/task' element = {<TasksForm/>} />
                    <Route path='/employee/task/action/:action/:ID' element = {<TasksForm/>} />
                </Routes>
                :
                location.pathname !== "/auth/login" && localStorage.getItem("Role") == "Employee" ? 
                <Routes>
                    <Route path='/dashboard' index element = {<Dashboard/>} />
                    <Route path="/" element = {<Navigate to="/dashboard" />} />
                    <Route path='/pdf' element = {<PDF/>} />
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
