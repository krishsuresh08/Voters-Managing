import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, IconButton } from '@mui/material';
import StyledDataGrid from '../Components/Table/Table';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined, VisibilityOutlined, EditOutlined} from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Axios from '../AxiosInstance';
import Swal from 'sweetalert2';

export default function Tasks() {

    const [rows, setRows] = useState([]);

    // List
    const ListTasks = ()=>{
        Axios.get('filter_details/get_task_details').then((res) => {
            if(res.data.status === "success"){
                setRows([...res.data.data]);
            }
        });
    };

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
                        ListTasks()
                    }
                }).catch(err =>{
                    Swal.fire({
                        icon:"error",
                        title: err
                    })
                }) 
                Swal.fire({
                    title:"Deleted",
                    text :"The data deleted successfully",
                    icon:"success"
                })
            }
            else if(result.dismiss){
                Swal.fire({
                    title:"Cancelled",
                    text :"The data is not deleted",
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
            field: "due_date",
            headerName: "Due Date",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
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
                    <Stack direction="row" spacing={1}>
                        <Link to={`/employee/task/action/update/${params.row.task_id}`}> <IconButton disableRipple sx={{p:0,}}><EditOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{handleRowDelete(params.row.task_id)}} sx={{p:0}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        ListTasks()
        if(localStorage.getItem("clicked_emp_id") !== null) {
            localStorage.removeItem("clicked_emp_id")
            localStorage.removeItem("clicked_emp_name")
        } 
    }, []);


    return (
        <div>
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", marginTop:"35px", borderRadius: "20px"}}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ fontWeight: "bold", color:"black !Important"  }}>Assigned Tasks</h1>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='task_id' />
            </div>
        </div>
    )
};
