import { Grid } from '@mui/material';
import React from 'react';
import NotFoundImg from "../Assets/Images/No data/1587605_228438-P28070-739.jpg";

export default function NotFound() {
  return (
    <div style={{height:"100vh"}}>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <img style={{width:"100%", height:"80%"}} src={NotFoundImg} alt='Not found' />
            </Grid>
        </Grid>
    </div>
  )
}
