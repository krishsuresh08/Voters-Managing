import { Autocomplete, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Axios from '../AxiosInstance';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link, useLocation } from 'react-router-dom';

export default function PDF() {

  const [pdfList, setPdfList] = useState([]);
  let location = useLocation();

  const ListPDF = () => {
      Axios.get('filter_details/list_pdf').then((res) => {
        setPdfList([...res.data.collections]);
      });
  };

  useEffect(() => {
    if(location.pathname !== "/pdf_list"){
      localStorage.removeItem("pdf")
    }
    ListPDF()
  }, []);

  return (
        <Grid container rowSpacing={2} columnGap={{sm:9, xs:1}} marginTop="35px" marginLeft="25px">
          <Grid sx={{ mb: 2 }} item xs={12}>
            <h1>Processed PDFs</h1>
          </Grid>
            {pdfList.map((val, index) => (
              <Grid item xs={12} sm={3}>
                <Link to="/pdf_list" style={{textDecoration:"none"}} onClick={() => {
                if (localStorage.getItem("pdf") == null ) {
                  console.log("" == null);
                  localStorage.setItem("pdf", val);
                }
              }}
                >
                  <Card key={index} style={{ marginBottom: '10px', cursor:"pointer" }}>
                      {/* You can customize the CardContent and Typography as needed */}
                      <CardContent sx={{display:"flex", justifyContent:"center"}}>
                        <PictureAsPdfIcon sx={{color:"red"}} />
                        <Typography sx={{ml:1}} variant="h5">{val}</Typography>                  
                      </CardContent>
                  </Card>
                </Link>
                </Grid>
            ))}
        </Grid>
    
  )
}
