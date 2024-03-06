import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import StyledDataGrid from '../Components/Table/Table';
import { Link, useNavigate } from 'react-router-dom';
import { EditOutlined} from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Axios from '../AxiosInstance';
import Swal from 'sweetalert2';
import moment from 'moment';

export default function SeperatePDF() {

    const [rows, setRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    let pdfNum = localStorage.getItem("pdf");

    function formatDate(value) {
        if (!value) return "";
        return moment(value).format('DD-MM-YYYY');
    };
    // list
    const ListPDF = ()=>{
        Axios.get('filter_details/all_pdf_data/?pdf_name=' + pdfNum).then((res) => {
            setRows([...res.data]);
        }).catch(err =>{
            Swal.fire({
                title: err,
                icon:"error",
                timer : 1650
            })
        });
    };

    // on Edit Button Click
    const onEditClick = (params)=>{
        localStorage.setItem("clicked_pdf", params.row.serial_no)
    }

    // Export
    const handleExportClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onExportClick = async () => {
        try {
        const response = await Axios.get('filter_details/export?pdf_name='+localStorage.getItem("pdf"), {
            responseType: 'blob', // Set response type to blob
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.xlsx');
        document.body.appendChild(link);
        link.click();
        handleClose()
        } catch (error) {
            Swal.fire({
                title:error,
                icon:"error"
            })
        }
    };
    
    const onExportCompleted = async () => {
        try {
            const pdfName = localStorage.getItem("pdf")
            const response = await Axios.get(`filter_details/export?pdf_name=${pdfName}&status=completed`, 
        {
            responseType: 'blob', // Set response type to blob
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.xlsx');
        document.body.appendChild(link);
        link.click();
        handleClose()
        } catch (error) {
            Swal.fire({
                title:error,
                icon:"error"
            })
        }
    };

    // Delete row 
    const handleRowDelete = (PDFID)=>{
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
                Axios.post(`employee/delete`, {emp_id: PDFID}).then((res)=>{
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
            field: "serial_no",
            headerName: "Num",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "pdf_name",
            headerName: "PDF Name",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "voter_id",
            headerName: "Voter ID",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
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
            field: "age",
            headerName: "Age",
            width: 100,
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
            field: "relation_name",
            headerName: "Relation Name",
            width: 200,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "relation",
            headerName: "Relation Type",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false
        },
        {
            field: "house_no",
            headerName: "Door No.",
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
                else if(sts == "partially completed" ){
                    color = "blue"
                }
                else{
                    color = "red"
                }
                return <div style={{backgroundColor, color}}>{sts}</div>
            }
        },
        {
            field: "created_on",
            headerName: "Created Date",
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
            field: "modified_on",
            headerName: "Modified Date",
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
            field: "modified_by",
            headerName: "Modified by",
            width: 150,
            editable: false,
            headerAlign: "left", 
            align: "left",
            sortable:false,
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
                        <Tooltip title="Edit"> <Link to={`/pdf/update`}> <IconButton onClick={()=> onEditClick(params)} disableRipple sx={{p:0,}}><EditOutlined/></IconButton></Link></Tooltip>
                        {/* <Tooltip title="Delete"><IconButton disableRipple onClick={()=>{handleRowDelete(params.row.emp_id)}} sx={{p:0}}><DeleteOutlineOutlined/></IconButton></Tooltip> */}
                    </Stack>
                )
            },
        }
    ];

    useEffect(() => {
        if(localStorage.getItem("pdf") == null){
            Swal.fire({
                title:"Something Wrong !!",
                text:"The PDF is not found",
                icon:"error",
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/pdf")
        }
        ListPDF()
    }, []);


    return (
        <div>
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", padding: "20px", borderRadius: "20px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <h1 style={{ fontWeight: "bold", color:"black"  }}>PDF</h1>
                    <div style={{display:"flex"}}>
                    <Button variant='contained' endIcon={<ArrowDropDownIcon />} onClick={handleExportClick}>Export</Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={onExportClick}>Export All</MenuItem>
                        <MenuItem onClick={onExportCompleted}>Export Completed</MenuItem>
                    </Menu>
                    <Link to='/pdf' underline="none"> <Button style={{ backgroundColor: "#4daaff", marginLeft:"10px" }} disableRipple disableElevation variant='contained'>Back</Button></Link>
                    </div>
                </Box>
                <StyledDataGrid columns={columns} rows={rows} filter={true} id='_id' />
            </div>
        </div>
    )
};
