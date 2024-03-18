import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../AxiosInstance';
import {tamilNaduData} from "../Assets/JSON/AutoComplete";
import NoData from '../Components/Card/NoData';

export default function PDF() {
  const [pdfList, setPdfList] = useState([]);
  const [Error, setError] = useState({ assembly: false, district: false });
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedAssembly, setSelectedAssembly] = useState(null);
  const [loading, setLoading] = useState(false);
  let location = useLocation();

  const ListPDF = async () => {
    try {
      const assembly = selectedAssembly || "";
      
      // Ensure selectedDistrict is not null before proceeding
      if (!selectedDistrict) {
        throw new Error("Please select a district.");
      }

      const response = await Axios.get(`filter_details/district?district=${selectedDistrict.name}&assembly=${assembly}`);
      if(response.data.pdf_names){
        setLoading(false)
        setPdfList([...response.data.pdf_names]);
      }
      else if(response.data[0].status == "failed"){
        setLoading(false)
        Swal.fire({
          title: response.data[0].message,
          text: "Check your input data is right",
          icon:"warning",
          showConfirmButton: false,
          timer: 2000
        })
        setPdfList([])
      }
    } 
    catch (err) {
      setLoading(false)
      Swal.fire({
        title: err.message || "An error occurred",
        text:"Database connection error",
        icon: "error",
      });
    }
  };

  const EmpPDF = () => {
    Axios.get("task/get_emp_pdf?emp_id=" + localStorage.getItem("EmpID")).then(res => {
      if(res.data.data.pdf_name.length>0){
        setPdfList([...res.data.data.pdf_name]);
      }      
    }).catch(err => {
      Swal.fire({
        title: err.message || "An error occurred",
        icon: "error"
      });
    });
  };

  const onFetchClick = () => {
    const FormError = {
      district: !selectedDistrict,
    };
    setError(FormError);

    if (!Object.values(FormError).includes(true)) {
      setLoading(true)
      ListPDF();
    }
    else if(Object.values(FormError).includes(true)){
      setPdfList([])
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("Role");
    if (location.pathname !== "/pdf_list") {
      localStorage.removeItem("pdf");
      localStorage.removeItem("clicked_pdf")
    }

    if (role === "Employee") {
      EmpPDF();
    }
    
    if(selectedDistrict == null) {
      setPdfList([]) }

  }, [location.pathname,selectedDistrict]);

  return (
    <div style={{background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)', height:"100%", paddingTop:"30px", paddingBottom:"30px"}}>
      {
        (localStorage.getItem("Role") == "Employee" && pdfList.length > 0 ) || localStorage.getItem("Role") === "admin" ?
        <div style={{background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", margin: "20px", borderRadius: "20px", paddingBottom:"20px"}}> 
          <Grid container rowSpacing={2} columnGap={{ sm: 6, xs: 1 }} paddingLeft="25px">
            <Grid sx={{ mb: 2 }} item xs={12}>
              <h1>Processed PDFs</h1>
            </Grid>
            {/* Dropdown */}
            {
              localStorage.getItem("Role") == "admin" && (
                <>
                  <Grid item xs={11} sm={5.5}>
                    <Box sx={{ pl: { sm: 3 } }}>
                      <Typography sx={{ fontWeight: "bold", mb: 1 }}>Select the District:</Typography>
                      <Autocomplete
                        value={selectedDistrict}
                        onChange={(event, newValue) => {
                          setSelectedDistrict(newValue);
                          setSelectedAssembly(null); // Reset assembly when district changes
                        }}
                        options={tamilNaduData}
                        getOptionLabel={(option) => option.name}
                        // isOptionEqualToValue={(option, value) => option.name === value.name}
                        renderInput={(params) => <TextField {...params} error={Error.district} helperText={Error.district ? "Field is required" : ""} label="District" />}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Box>
                      <Typography sx={{ fontWeight: "bold", mb: 1 }}>Select the Assembly:</Typography>
                      <Autocomplete 
                      disabled={!selectedDistrict} 
                      value={selectedAssembly}
                        onChange={(event, newValue) => {
                          setSelectedAssembly(newValue);
                        }}
                        options={selectedDistrict ? selectedDistrict.assembly : []}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Assembly" />}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={11.5} sx={{ display: "flex", justifyContent: "center" }}>
                    {
                      loading ?
                      (
                        <CircularProgress />
                      )
                      :
                      <Button variant='contained' onClick={onFetchClick}>Fetch</Button>
                    }
                    
                  </Grid>
                </>
              )
            }
            {pdfList.map((val, index) => (
              <Grid item xs={12} sm={3} key={index}>
                <Link to="/pdf_list" style={{ textDecoration: "none" }} onClick={() => {
                  localStorage.setItem("pdf", val);
                  // localStorage.pdf ? localStorage.setItem("pdf", val) : localStorage.setItem("pdf", "W2")
                }}>
                  <Card style={{ marginBottom: '10px',height:"100px", borderRadius: "15px", cursor: "pointer" }}>
                    <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                      <PictureAsPdfIcon sx={{ color: "red" }} />
                      <Typography sx={{ ml: 1 }} variant="h5">{val}</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>     
        :
        <NoData h1="No PDFs found" h3="Wait for the admin to assign you tasks to view the PDFs"/>
      }


    </div>
  );
}
