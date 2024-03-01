import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, } from '@mui/x-data-grid';
import { useState } from 'react';

export default function QuickFilteringGrid(props) {

  const [Data,setData]=useState([...props.rows]);
  
  // Customized Tool Bar

  // const CustomToolBar = ()=>{
  //   return(
  //     <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mt:"10px", }}>
  //       {
  //         props.visibleSearch ?
  //           <GridToolbarQuickFilter variant='outlined' placeholder='Search Here..'
  //           sx={{ borderRadius:"10px", px:2, py:1, input: {border:"ActiveBorder", color: '#455560', "&::placeholder": { opacity: 1, } }  }}
  //           />
  //         : ""
  //       }
  //     </Box>
  //   )
  // };

  React.useEffect(()=>{
    setData([...props.rows])
  },[props])

  return (
    <Box>
      {/* DataGrid */}
      <DataGrid sx={{ mt:2,
        '.MuiDataGrid-cell': { fontSize:"16px" }, //tableCell
        '& .MuiDataGrid-columnHeaders': { backgroundColor: '#4daaff', color:"white", fontSize:"16px", }, //tableHeader
        '& .MuiDataGrid-columnHeaderTitle':{fontWeight:"bold"},
        '& .MuiDataGrid-columnHeaderTitleContainer':{justifyContent:"center"},
        "& .MuiDataGrid-cell" :{justifyContent:"center"}
      }}
        autoHeight
        disableColumnMenu
        GridColDef={false}
        // hideFooter={true}
        // rows={list}
        getRowId={(row)=> typeof(props.id) == "string" ? row[props.id] : props.id}
        disableColumnFilter
        disableColumnSelector
        disableRowSelectionOnClick
        disableMultipleRowSelection
        disableDensitySelector
        columns={props.columns}
        rows={Data}
        // components={{
        //   Toolbar: CustomToolBar
        // }}
      />

    </Box>
  );
}
