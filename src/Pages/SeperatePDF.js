import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import StyledDataGrid from '../Components/Table/Table';
import { Link } from 'react-router-dom';
import {DeleteOutlineOutlined, VisibilityOutlined, EditOutlined, PrintOutlined} from '@mui/icons-material'
import Axios from '../AxiosInstance';
import Swal from 'sweetalert2';

export default function SeperatePDF() {

    const [rows, setRows] = useState([]);
    let pdfNum = localStorage.getItem("pdf")

    const ListPDF = ()=>{
        Axios.get('filter_details/all_pdf_data/?pdf_name=' + pdfNum).then((res) => {
            console.log(res.data);
                setRows([...res.data.data_from_db]);
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
                        ListPDF()
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
            headerName: "Name",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "voter_id",
            headerName: "Voter ID",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
            renderCell : (params) =>{
                const sts = params.value;
                let backgroundColor = "";
                let color = "";
                if(sts == "completed"){
                    backgroundColor = "green";
                    color = "white"
                }
                else if(sts == "partially completed" ){
                    backgroundColor = "yellow";
                    color = "black"
                }
                else{
                    backgroundColor = "red";
                    color = "white"
                }
                return <div style={{backgroundColor, color}}>{sts}</div>
            }
        },
        // {
        //     field: "none",
        //     headerName: "Action",
        //     width: 120,
        //     editable: false,
        //     headerAlign: "left", 
        //     align: "left",
        //     sortable:false,
        //     renderCell: (params) => {
        //         return (
        //             <Stack direction="row" spacing={2}>
        //                 <Link to={`/employee/create/update/${params.row.emp_id}`}> <IconButton disableRipple sx={{p:0,}}><EditOutlined/></IconButton></Link>
        //                 <Link to={`/employee/create/read/${params.row.emp_id}`}><IconButton  disableRipple sx={{p:0,}}><VisibilityOutlined/></IconButton></Link>
        //                 <IconButton disableRipple onClick={()=>{handleRowDelete(params.row.emp_id)}} sx={{p:0}}><DeleteOutlineOutlined/></IconButton>
        //             </Stack>
        //         )
        //     },
        // }
    ];

    useEffect(() => {
        ListPDF()
    }, []);


    return (
        <div>
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ fontWeight: "bold", color:"black !Important"  }}>PDF</h1>
                    {/* <Link to='/employee/create' underline="none"> <Button style={{ backgroundColor: "#4daaff" }} disableRipple disableElevation variant='contained'>Add New</Button></Link> */}
                </Box>
                <StyledDataGrid columns={columns} rows={rows} id='_id' />
            </div>
        </div>
    )
};
