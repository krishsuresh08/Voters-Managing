import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import React from 'react';

export default function dashboard() {
  return (
    <Grid container sx={{p:2}} rowGap={3}>
      <Grid item xs={12}>
        <h1>dashboard</h1>
      </Grid>
      <Grid item xs={12} >
        <Grid container>
          <Grid item xs={3}>
            <Card sx={{height:"125px", display:"flex", alignItems:"center",}}>
              <CardActionArea disableRipple>
                <CardContent sx={{display:"flex", justifyContent:"space-between"}}>
                  <h2>Total Completed </h2>
                  <h2>100</h2>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
