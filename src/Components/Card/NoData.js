import React from 'react';
import NoDataImg from "../../Assets/Images/No data/img.png";
import { Grid } from '@mui/material';

export default function NoData(props) {
  return (
    <div style={{ height:"100%"}}>
        <Grid container rowGap={3}>
            <Grid item xs={12}>
                <h1 style={{textAlign:"center"}}>
                    {props.h1}
                </h1> 
            </Grid>
           <Grid item xs={12} sx={{display:"flex", justifyContent:"center", }}>
            <img 
            alt='No data' 
            src={NoDataImg} 
            style={{
                boxShadow: "gray 0px 8px 24px", 
                background:"black", 
                borderRadius:"15px",
                height: '200px', // Default height
                width: '250px', // Default width
            }} 
            />           
            </Grid>
            <Grid item xs={12}>
                <h3 style={{textAlign:"center"}}>
                    {props.h3}
                </h3>
            </Grid>

        </Grid>
    </div>
  )
}
