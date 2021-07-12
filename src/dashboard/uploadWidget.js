import React,{useState,useEffect} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import {route} from '../route';

function RepUpload(props) {
    let ipBtn;
    const [swal,setSwal]=useState(false);
    const [frmData,setFrm]=useState([]);
    const [hover,setHover]=useState(null);
    //const [conf,setConf]=useState(false);
    /*
    useEffect(() => {
      if(props.type==="emi")
        getDates()
    },[props.type]);

    const getDates=()=>{
      props.isLoad(true);
      let config = {};
      const header = {
          Authorization: "Bearer " + localStorage.enalmsjwttkn
      }
      axios.post(route + "/getemitrack", config, {headers:header})
        .then((res)=>{
          if("error" in res.data.msg) {
              alert(res.data.msg.error);
              props.isLoad(false);
              return;
          }
          console.log(res.data.msg);
          props.isLoad(false);
        }).catch((err) => {
                  alert("Err");
                  console.log(err);
                  props.isLoad(false);
              }
        );
    }*/

    const handleClick = (e) => {
        if(props.type==="emi"){
          setSwal(true);
          let config = {};
          const header = {
              Authorization: "Bearer " + localStorage.enalmsjwttkn
          }
          axios.post(route + "/getemitrack", config, {headers:header})
            .then((res)=>{
              if("error" in res.data.msg) {
                  alert(res.data.msg.error);
                  props.isLoad(false);
                  return;
              }
              console.log(res.data.msg.success);
              setFrm(res.data.msg.success);
              props.isLoad(false);
            }).catch((err) => {
                    alert("Err");
                    console.log(err);
                    props.isLoad(false);
                }
            );
            
        }else{
          if(swal){
            setSwal(false);
          }
          ipBtn.click();
        }
    }

    const confHandle=(e)=>{
      ipBtn.click();
      setSwal(false);
    }

    const cancelHandle=(e)=>{
      setSwal(false);
    }

    const handleMouseIn=()=>{
      setHover(true);
    }

    const handleMouseOut=()=>{
      setHover(false);
    }

    let stl = {
        width:"auto",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize:"18px",
        padding: "1px 3px 0 3px"
    };
    let istl = {
        margin:"8px 2px 0px 0"
    }

    return (
        <div onClick={handleClick} style={stl} className="dashFlBtn navStl">
                <SweetAlert
                 show={swal}
                  warning 
                  title="Reminder"
                  style={{backgroundImage:`linear-gradient(rgb(26, 25, 25), ${props.initcol}`}}
                   customButtons={<React.Fragment>
                    <button onClick={confHandle} style={{margin:"20px",width: "120px",height:"40px"}}>Yes,Continue</button>
                    <button onClick={cancelHandle} style={{margin:"20px",width: "120px",height:"40px"}}>Cancel</button>
                  </React.Fragment>}
                >{frmData ? frmData.map((ele,idx)=>{
                  return (
                    <div key={idx}>
                      {(idx==0) ? "Last weekly emi data uploaded -> "+ele : "Last monthly emi data uploaded -> "+ele}
                    </div>
                  )
                }) : "No data uploaded till now"}<br/><div>
                          {!hover && <div onClick={handleMouseIn}><p style={{fontWeight:"bold"}}>**Click here to know more</p></div>}
                              <div>
                                  <br/><div style={{display:hover ? 'block' : 'none'}}>1. Don't forget to rename and add "weekly" or "monthly" in file name before upload if not there and check the last upload dates above !!</div>
                                  <br/><div style={{display:hover ? 'block' : 'none'}}>2. File format will be in .csv</div>
                                  <br/><div style={{display:hover ? 'block' : 'none'}}>3. Columns 'Tid','Repayment date','Actual EMI deducted' are used, rename properly. 'Repayment date' will be in 'yyyy-mm-dd' or 'dd-mm-yyyy' format</div>
                              </div>
                              {hover && <button onClick={handleMouseOut} style={{margin:"20px",width: "120px",height:"40px"}}>Got it</button>}
                          </div>
                  </SweetAlert>
                <i style={istl} className={props.icon}></i>
                 {props.wdLabl}
                 <input
                  hidden
                  id="fileUpload" 
                  type="file"
                  onChange={props.onChange}
                  ref={el => (ipBtn = el)}
                  />
        </div>
    );
}

export default RepUpload;