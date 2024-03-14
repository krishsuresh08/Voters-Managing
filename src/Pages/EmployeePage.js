import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, IconButton, Tooltip, CircularProgress } from '@mui/material';
import StyledDataGrid from '../Components/Table/Table';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined, EditOutlined} from '@mui/icons-material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Axios from '../AxiosInstance';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import "../Assets/CSS/style.css";

export default function Employee() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // List
    const ListEmp = ()=>{
        Axios.get('employee_details/get_all_emp_data').then((res) => {
            setLoading(true)
            if(res.data.status === "success"){
                setLoading(false)
                setRows([...res.data.data]);
            }
        }).catch(err => {
            Swal.fire({
            title:err,
            icon:"error",
        })
      });
    };

    const onTaskClick = (id, name) =>{
        localStorage.setItem("clicked_emp_id",id );
        localStorage.setItem("clicked_emp_name", name)
        navigate("/employee/task/create")
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
                Axios.delete(`employee_details/delete_emp?emp_id=`+ EmployeeID).then((res)=>{
                    if (res.data.status === "success"){
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
            field: "name",
            headerName: "Employee Name",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "email",
            headerName: "email",
            flex:1,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "phone_number",
            headerName: "Phone Number",
            flex:1,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "none",
            headerName: "Action",
            flex:1,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Edit"><Link to={`/employee/update/${params.row.emp_id}`}><IconButton disableRipple sx={{p:0,}}><EditOutlined/></IconButton></Link></Tooltip>
                        <Tooltip title="Delete"><IconButton disableRipple onClick={()=>{handleRowDelete(params.row.emp_id)}} sx={{p:0}}><DeleteOutlineOutlined/></IconButton></Tooltip>
                        <Tooltip title="Assign Task"><IconButton onClick={() => onTaskClick(params.row.emp_id, params.row.name)} disableRipple sx={{p:0,}}><AssignmentIcon/></IconButton></Tooltip>
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        ListEmp()
    }, []);


    return (
        <div style={{background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)', height:"93vh", paddingTop:"55px"}}>
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px"}}>
                <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop:2,  }}>
                    <h1 style={{ fontWeight: "bold", color:"black !Important"  }}>Employees</h1>
                    <Link to='/employee/create' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='emp_id' />
                {/* {loading ? (
                      <CircularProgress />
                  ) : (
                    <StyledDataGrid columns={columns} rows={rows} id='emp_id' />
                  )} */}
                
            </div>
        </div>
    )
};
