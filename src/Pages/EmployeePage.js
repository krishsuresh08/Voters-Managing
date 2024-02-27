import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import StyledDataGrid from '../Components/Table/Table';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined, VisibilityOutlined, EditOutlined, PrintOutlined} from '@mui/icons-material'
import Axios from '../AxiosInstance';
import Swal from 'sweetalert2';

export default function Employee() {

    const [rows, setRows] = useState([]);

    const ListEmp = ()=>{
        Axios.get('employee_details/get_all_emp_data').then((res) => {
            if(res.data.status === "success"){
                setRows([...res.data.data]);
            }
        });
    };

    // Delete row
    
    const handleRowDelete = (EmployeeID)=>{
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
                Axios.post(`employee/delete`, {emp_id: EmployeeID}).then((res)=>{
                    if (res.data.status === true){
                        ListEmp()
                    }
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
            field: "emp_name",
            headerName: "Employee Name",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "email",
            headerName: "email",
            width: 300,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "none",
            headerName: "Action",
            width: 120,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Link to={`/employee/create/update/${params.row.emp_id}`}> <IconButton disableRipple sx={{p:0,}}><EditOutlined/></IconButton></Link>
                        <Link to={`/employee/create/read/${params.row.emp_id}`}><IconButton  disableRipple sx={{p:0,}}><VisibilityOutlined/></IconButton></Link>
                        <IconButton disableRipple onClick={()=>{handleRowDelete(params.row.emp_id)}} sx={{p:0}}><DeleteOutlineOutlined/></IconButton>
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        ListEmp()
    }, []);


    return (
        <div>
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ fontWeight: "bold", color:"black !Important"  }}>Employees</h1>
                    <Link to='/employee/create' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} visibleSearch={true} id='emp_id' />
            </div>
        </div>
    )
};
