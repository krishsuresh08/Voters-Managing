import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from '../../AxiosInstance';
import Swal from 'sweetalert2';
import moment from 'moment';
import VoterImage from "../../Assets/Images/Logo/logo.png";

export default function PDFform() {

    const [VoterName, setVoterName] = useState("");
    const [VoterAge, setVoterAge] = useState("");
    const [VoterID, setVoterID] = useState("");
    const [RelationName, setRelationName] = useState("");
    const [Relation, setRelation] = useState("");
    const [VoterGender, setVoterGender] = useState("");
    const [PDFstatus, setPDFstatus] = useState("");
    const [PageNum, setPageNum] = useState("");
    const [DataNum, setDataNum] = useState("");
    const [HouseNum, setHouseNum] = useState("");
    const [ImgPath, setImgPath] = useState("");
    const [TextData, setTextData] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [createdOn, setcreatedOn] = useState("");

    const [Error, setError] = useState({
        name : false,
        age : false,
        gender : false,
        relation: false,
        relation_name: false,
        voterid: false,
        status: false,
        doornum: false
    });

    const navigate = useNavigate();
    // let serial_num = parseInt(localStorage.getItem("clicked_pdf"));
    let serial_num = (localStorage.getItem("clicked_pdf"));
    let pdf = localStorage.getItem("pdf");

    if( serial_num == "" || pdf == "" || pdf == null){
        Swal.fire({
            title:"Necessary details not found from database",
            icon:"error",
        })
        navigate("/pdf")
    }

    const UpdateData = {
        name: VoterName, age: VoterAge, gender: VoterGender, 
        voter_id : VoterID, status: PDFstatus, relation: Relation, 
        relation_name: RelationName, pdf_name : pdf, 
        serial_no: serial_num, house_no:HouseNum, image_path: ImgPath, 
        data_no:DataNum, created_by: "createdBy", created_on: moment(createdOn).format("YYYY-MM-DD HH:mm:ss"), modified_on: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), 
        modified_by: localStorage.getItem("Name"), page_no :PageNum, text_data: TextData,
    };

    // APIs
    const view = ()=>{
      pdf && (
        Axios.get(`filter_details/get_document?pdf_name=${pdf}&serial_no=${serial_num}`).then(res =>{
            if(res.statusText == "OK"){
                setVoterName(res.data.name ? res.data.name : "")
                setVoterAge(res.data.age ? res.data.age : "")
                setVoterGender(res.data.gender ? res.data.gender : "")
                setRelationName(res.data.relation_name ? res.data.relation_name : "")
                setRelation(res.data.relation ? res.data.relation : "")
                setVoterID(res.data.voter_id ? res.data.voter_id : "")
                setPDFstatus(res.data.status ? res.data.status : "")
                setPageNum(res.data.page_no ? res.data.page_no : "")
                setDataNum(res.data.data_no ? res.data.data_no : "")
                setHouseNum(res.data.house_no ? res.data.house_no : "")
                setImgPath(res.data.image_path ? res.data.image_path : "")
                setTextData(res.data.text_data ? res.data.text_data : "")
                setcreatedOn(res.data.created_on ? res.data.created_on : "")
                setCreatedBy(res.data.created_by ? res.data.created_by : "")
            }
        }).catch(err =>{
            Swal.fire({
                title:err,
                icon:"error",
                timer:2000
            })
        })
      )
    };

    const post = () =>{
      Axios.patch("filter_details/update_document?pdf_name="+ pdf, UpdateData).then((res)=>{
        if(res.statusText == "OK"){
            Swal.fire({
                icon:"success",
                timer:2000,
                title: "Updated Successfully"
            })

            localStorage.removeItem("clicked_pdf")
            navigate("/pdf_list")
        }
      }).catch(err =>{
          Swal.fire({
            title: err,
            icon:"error",
            // timer: 1600
          })
      })
    };

    // onclick Functions
    const onCancelClick = () =>{
        navigate("/pdf_list")
    };

    const  onSubmitClick = () =>{
      const FormError = {
          name : VoterName.trim() == "" ? true : false,
          age : VoterAge.trim() == "" ? true : false,
          gender : VoterGender.trim() == "" ? true : false,
          relation: Relation.trim() == "" ? true : false,
          relation_name: RelationName.trim() == "" ? true : false,
          voterid: VoterID.trim() == "" ? true : false,
          status: PDFstatus.trim() == "" ? true : false,
          doornum: HouseNum.trim() == "" ? true : false,
      }
      setError(FormError)
      if (Object.values(FormError).some(val => val === true)){
      }
      else{
        post()
      }
    };

    useEffect(() =>{
        view()
        if(localStorage.pdf == null){
          navigate("/pdf")
        }
    }, [])

  return (
    <div style={{ height:"100%", background: 'linear-gradient(to bottom, #F0F8FF, #89CFF0)', paddingTop:"30px"}}>
      {/* <Box sx={{display:{md:"none", xs:"flex"}, justifyContent:"center"}}>
          <img src={VoterImage} style={{position:"sticky", top:0}} width="200px" height="100px" />
      </Box> */}
      <Grid container justifyContent="center">
        {/* <Grid item sm={5} sx={{display:{md:"none", xs:"flex"}, justifyContent:"center"}} >
          <img src={VoterImage} style={{position:"sticky", top:0}} width="200px" height="100px" />
        </Grid> */}
        <Grid item md={6} style={{ background: "#FFF", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", margin: "20px", borderRadius: "20px"}}>
          <Grid container rowGap={3} justifyContent="center" paddingTop={3}>
            <Grid item xs={12}  sx={{textAlign: "center"}}>
              <h1>Edit PDF details</h1>
            </Grid>
            <Grid item xs={11}>
              <TextField type='text' label="Name" size='small' value={VoterName} error={Error.name} helperText={Error.name ? "Field is necessary" : ""} onChange={(e => setVoterName(e.target.value))} fullWidth  />
            </Grid>
            <Grid item xs={11}>
              <TextField type='text' label="Age" size='small' fullWidth value={VoterAge} error={Error.age} helperText={Error.age ? "Field is necessary" : ""} onChange={(e => setVoterAge(e.target.value))} />
            </Grid>
            <Grid item xs={11}>
              <TextField type='text' label="Gender" size='small' fullWidth value={VoterGender} error={Error.gender} helperText={Error.gender ? "Field is necessary" : ""} onChange={(e => setVoterGender(e.target.value))} />
            </Grid>
            <Grid item xs={11}>
              <TextField type='text' label="Door number" size='small' fullWidth value={HouseNum} error={Error.doornum} helperText={Error.doornum ? "Field is necessary" : ""} onChange={(e => setHouseNum(e.target.value))} />
            </Grid>
            <Grid item xs={11}>
              <TextField type='text' label="Voter ID" size='small' fullWidth value={VoterID} error={Error.voterid} helperText={Error.voterid ? "Field is necessary" : ""} onChange={(e => setVoterID(e.target.value))} />
            </Grid>
            <Grid item xs={11}>
              <TextField type='text' label="Relation Name" size='small' fullWidth value={RelationName} error={Error.relation_name} helperText={Error.relation_name ? "Field is necessary" : ""} onChange={(e => setRelationName(e.target.value))} />
            </Grid>
            <Grid item xs={11}>
              <TextField type='text' label="Realation Type" size='small' fullWidth value={Relation} error={Error.relation} helperText={Error.relation ? "Field is necessary" : ""} onChange={(e => setRelation(e.target.value))} />
            </Grid>
            <Grid item xs={11}>
              <FormControl size='small' fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={PDFstatus} label="Status" size='small' error={Error.status} helperText={Error.status ? "Field is necessary" : ""} onChange={(e => setPDFstatus(e.target.value))}>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="partially completed">Partially Completed</MenuItem>
                </Select> 
              </FormControl>
            </Grid>
            <Grid item xs={11}>
              <Box sx={{display:"flex", justifyContent:"center", paddingBottom:"20px"}}>
                <Button variant='contained' disableRipple disableElevation onClick={onSubmitClick}>Update</Button>
                <Button variant='contained' disableRipple disableElevation onClick={onCancelClick} style={{backgroundColor:"red", color:"white"}}>Cancel</Button>
              </Box>        
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={5} sx={{display:{md:"flex", xs:"none"}, justifyContent:"center"}} >
          <img src={VoterImage} style={{position:"sticky", top:250}} width="200px" height="100px" />
        </Grid>
      </Grid>
    </div>
  )
}
