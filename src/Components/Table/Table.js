import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, } from '@mui/x-data-grid';
import { useState } from 'react';
import { MenuItem, Select } from '@mui/material';

export default function QuickFilteringGrid(props) {

  const [Data,setData]=useState([...props.rows]);
  const [filter,setfilter]=useState("All");

  // filter
  const filterChange=(value)=>{
    setfilter(value)
    if(value == "All"){
      setData([...props.rows])
    }else if(value == 'completed'){
      // console.log("herer", props.rows.filter(val => val.status == "completed"));
      setData([...(props.rows.filter(val => val.status == "completed"))])
    }else if(value == "progress"){
      setData([...(props.rows.filter(val => val.status == "partially completed"))])
    }
  };
  
  // Customized Tool Bar
  const CustomToolBar = ()=>{
    return(
      <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",m:props.filter ? "10px" : "", }}>
        {props.filter ?
        <Select sx={{width:"200px"}} value={filter} size='small' onChange={(e)=> filterChange(e.target.value)}>
          <MenuItem value='All'>All</MenuItem>
          <MenuItem value='completed'>Completed</MenuItem>
          <MenuItem value='progress'>Partially Completed</MenuItem>          
        </Select>
        :""}
      </Box>
    )
  };

  React.useEffect(()=>{
    setData([...props.rows])
  },[props])

  return (
    <Box>
      {/* DataGrid */}
      <DataGrid sx={{ mt:2,
        '.MuiDataGrid-cell': { fontSize:"16px" }, //tableCell
        '& .MuiDataGrid-columnHeaders': { backgroundColor: "#6FA8DC", color:"white", fontSize:"16px", }, //tableHeader
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
        components={{
          Toolbar: CustomToolBar
        }}
      />

    </Box>
  );
}
