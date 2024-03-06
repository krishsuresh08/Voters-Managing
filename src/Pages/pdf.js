import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../AxiosInstance';
import {tamilNaduData} from "../Assets/JSON/AutoComplete";

export default function PDF() {
  const [pdfList, setPdfList] = useState([]);
  const [Error, setError] = useState({ assembly: false, district: false });
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedAssembly, setSelectedAssembly] = useState(null);
  let location = useLocation();

const ListPDF = async () => {
  try {
    const assembly = selectedAssembly || "";
    
    // Ensure selectedDistrict is not null before proceeding
    if (!selectedDistrict) {
      throw new Error("Please select a district.");
    }

    const response = await Axios.get(`filter_details/district?district=${selectedDistrict.name}&assembly=${assembly}`);
    // console.log(response.data[0].status);
    if(response.data.pdf_names){
      setPdfList([...response.data.pdf_names]);
    }
    else if(response.data[0].status == "failed"){
      Swal.fire({
        title: response.data[0].message,
        text: "Check your input data is right",
        icon:"warning",
        showConfirmButton: false,
        timer: 2000
      })
      setPdfList([])
    }
    
  } catch (err) {
    Swal.fire({
      title: err.message || "An error occurred",
      icon: "error",
    });
  }
};


  const EmpPDF = () => {
    Axios.get("task/get_emp_pdf?emp_id=" + localStorage.getItem("EmpID")).then(res => {
      setPdfList([...res.data.data.pdf_name]);
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
      ListPDF();
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("Role");
    if (location.pathname !== "/pdf_list") {
      localStorage.removeItem("pdf");
    }

    if (role === "Employee") {
      EmpPDF();
    }
  }, [location.pathname]);

  return (
    <Grid container rowSpacing={2} columnGap={{ sm: 6, xs: 1 }} marginTop="35px" paddingLeft="25px">
      <Grid sx={{ mb: 2 }} item xs={12}>
        <h1>Processed PDFs</h1>
      </Grid>
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
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant='contained' onClick={onFetchClick}>Fetch</Button>
            </Grid>
          </>
        )
      }

      {pdfList.map((val, index) => (
        <Grid item xs={12} sm={3} key={index}>
          <Link to="/pdf_list" style={{ textDecoration: "none" }} onClick={() => {
            localStorage.setItem("pdf", val);
          }}>
            <Card style={{ marginBottom: '10px', borderRadius: "15px", cursor: "pointer" }}>
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <PictureAsPdfIcon sx={{ color: "red" }} />
                <Typography sx={{ ml: 1 }} variant="h5">{val}</Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
