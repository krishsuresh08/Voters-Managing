import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, IconButton, Tooltip, Menu, MenuItem, Grid } from '@mui/material';
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
    let pdfNum = localStorage.pdf && localStorage.getItem("pdf").trim();

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
                text: err,
                title:"try again",
                icon:"warning",
                timer : 1500
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
                title:"data cannot br found",
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
        <div style={{background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)', height:"120%", paddingTop:"30px", paddingBottom:"20px"}}>
            <div style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", margin: "20px",paddingBottom:"20px", borderRadius: "20px" }}>
                <Grid container rowGap={2} sx={{ display: "flex", justifyContent: "space-between", pt:2  }}>
                    <Grid item xs={11} sm={9}>
                        <h1 style={{ fontWeight: "bold", color:"black" , marginLeft:"10px" }}>PDF</h1>
                    </Grid>
                    <Grid item xs={11} sm={3}>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                                <Button variant='contained' endIcon={<ArrowDropDownIcon />} onClick={handleExportClick}>Export</Button>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem onClick={onExportClick}>Export All</MenuItem>
                                    <MenuItem onClick={onExportCompleted}>Export Completed</MenuItem>
                                </Menu>
                                <Link to='/pdf' underline="none"> <Button style={{ backgroundColor: "#4daaff", marginRight:"10px" }} variant='contained'>Back</Button></Link>
                            </div>
                    </Grid>
 
                </Grid>
                <StyledDataGrid columns={columns} rows={rows} filter={true} id='_id' />
            </div>
        </div>
    )
};
