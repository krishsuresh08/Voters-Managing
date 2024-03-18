import React, { useEffect, useState } from 'react';
import { Box, Stack, IconButton, Tooltip } from '@mui/material';
import StyledDataGrid from '../Components/Table/Table';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined, EditOutlined} from '@mui/icons-material';
import Axios from '../AxiosInstance';
import Swal from 'sweetalert2';
import moment from 'moment';
import NoData from '../Components/Card/NoData';

export default function Tasks() {

    const [rows, setRows] = useState([]);

    function formatDate(value) {
        if (!value) return "";
        return moment(value).format('DD-MM-YYYY');
    };

    // List All
    const ListTasks = ()=>{
        Axios.get('filter_details/get_task_details').then((res) => {
            if(res.data.status === "success"){
                setRows([...res.data.data]);
            }
        }).catch(err => {
        Swal.fire({
          title:err,
          icon:"error",
        })
      });
    };

    // Employee Task
    const EmpTasks = () =>{
        Axios.get("task/assigned_tasks?emp_id="+localStorage.getItem("EmpID")).then(res =>{
            if(res.data.status === "success"){
                setRows([...res.data.data]);
            }
        }).catch(err =>{
            Swal.fire({
                title:err,
                icon:"error"
            })
        })
    }

    // Delete row 
    const handleRowDelete = (TaskID)=>{
        Swal.fire({
            title:"Are you Sure ?",
            text:"You want to delete it?",
            icon:"warning",
            confirmButtonText:"Yes Delete it",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if(result.isConfirmed){
                // delete api
                Axios.delete(`task/delete_task?task_id=`+ TaskID).then((res)=>{
                    if (res.data.status === "success"){
                        Swal.fire({
                            title :res.data.message,
                            icon:"success"
                        })
                        ListTasks()
                    }}).catch(err =>{
                        Swal.fire({
                            icon:"error",
                            title: err
                        }) }) 
            }
            else if(result.dismiss){
                Swal.fire({
                    title :"The data is not deleted",
                    icon:"info",
                    showConfirmButton:false,
                    timer: 1500
                })
            }
        })
    };

    // table column
    const columns = [
        {
            field: "name",
            headerName: "Assigned to",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "description",
            headerName: "Description",
            width: 300,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "pdf_name",
            headerName: "PDF",
            width: 100,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "priority",
            headerName: "Priority",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell : (params) =>{
                const sts = params.value;
                let backgroundColor = "";
                let color = "";
                if(sts == "completed"){
                    color = "green"
                }
                else if(sts == "progress" ){
                    color = "blue"
                }
                else{
                    color = "red"
                }
                return <div style={{backgroundColor, color}}>{sts}</div>
            }
        },
        {
            field: "due_date",
            headerName: "Due Date",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            valueFormatter: (params) => {
                const valueFormatted = formatDate(params.value);
                return valueFormatted;
            }
        },
        {
            field: "none",
            headerName: "Action",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell: (params) => {
                return (
                    <Stack sx={{display: localStorage.getItem("Role") == "admin" ? "block" :"none"}} direction="row" spacing={1}>
                        <Tooltip title="Edit"><Link to={`/employee/task/update/${params.row.task_id}`}> <IconButton disableRipple sx={{p:0,}}><EditOutlined/></IconButton></Link></Tooltip>
                        <Tooltip title="Delete"><IconButton disableRipple onClick={()=>{handleRowDelete(params.row.task_id)}} sx={{p:0}}><DeleteOutlineOutlined/></IconButton></Tooltip>
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        const role = localStorage.getItem("Role");

        if (role === "admin") {
            ListTasks();
        } else if (role === "Employee") {
            EmpTasks();
        }

        if (localStorage.getItem("clicked_emp_id") !== null) {
            localStorage.removeItem("clicked_emp_id");
            localStorage.removeItem("clicked_emp_name");
        }
    }, []);

    return (
        <div style={{background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)', height:"100%", paddingTop:"30px", paddingBottom:"30px" }}>
            {
                rows.length>0 ?
                <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", margin: "20px",paddingBottom:"20px",  borderRadius: "20px"}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <h1 style={{ fontWeight: "bold", color:"black", marginLeft:"10px", paddingTop:"20px"}}>Assigned Tasks</h1>
                    </Box>
                    <StyledDataGrid columns={columns} rows={rows} id='task_id' />
                </div>
                :
                <NoData h1="Tasks has not been assigned" h3="Wait for the admin to assign you tasks to see your tasks" />
            }

        </div>
    )
};
