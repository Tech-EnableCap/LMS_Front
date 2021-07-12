import './App.css';
import Sidebar from './sidebar';
import Loader from './loader_modal';
import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard/dashboard';
import Analysis from './analysis';
import MasterRepay from './masterRepay/masterRepay';
import Login from './login/login';
import {ChromePicker} from 'react-color';
import SweetAlert from 'react-bootstrap-sweetalert';

let lid,pg;
let ele=null;
let color_code="#52142b";
function App() {  
  useEffect(() => {
    if(typeof(Storage) === "undefined") {
      alert("LocalStorage not available, some plugins might be blocking it, try uninstalling them, or switch to different browser.");
      return;
    }
  }
  ,[]);

  const ccd=JSON.parse(localStorage.getItem('col_code'));
  if(ccd){
    color_code=ccd.col_code;
  }

  const [sdBarSt, setSd] = useState("login"); //change default value to "ana"
  const [hide, setHide] = useState(true);  
  const [col,setCol]=useState(false);

  const [initcol,setInitcol]=useState(color_code);

  const onClickBank = () => {
    setSd("bank");
  }
  const onClickDis = () => {
    setSd("dis");
  }
  const onClickDash = () => {
    setSd("dash");
  }
  const onClickAna = () => {
    setSd("ana");
  }
  const onClickEfx = () => {
    setSd("equifax");
  }
  const onClickMaster = () => {
    setSd("master");
  }
  const onClickStatus = () => {
    setSd("report_status")
  }
  const isLoad = (e) => {
    setHide(!e);
  }
  const hndlViewMore = (e) => {
    //alert(e.target.name.length);
    if(e.target.name.length > 2) {
      setSd("pmt");
      lid = e.target.name;
    }
}
const hndlLogin = () => {
  setSd("ana");
}

const handleChangeComplete=(c)=>{
  let get_col;
  let r=c.rgb["r"];
  let g=c.rgb["g"];
  let b=c.rgb["b"];
  let a="a" in c.rgb ? c.rgb["a"] : 0;
  get_col="rgba("+r+","+g+","+b+","+a+")";
  setInitcol(convert_hex(get_col));
}

const selectTheme=()=>{
  setCol(true);
}

const cancelColor=()=>{
  setCol(false);
  setInitcol(color_code);
}

const closeColor=()=>{
  setCol(false);
  console.log(initcol);
  localStorage.setItem(
    'col_code',
    JSON.stringify({col_code:initcol})
  );
}

const convert_hex=(col_val)=>{
  let alp,rgba,alpha,hex;
  rgba=col_val.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  alpha=(rgba && rgba[4] || "").trim();
  hex=rgba ? (rgba[1] | 1 << 8).toString(16).slice(1)+(rgba[2] | 1 << 8).toString(16).slice(1)+(rgba[3] | 1 << 8).toString(16).slice(1) : col_val;
  if (alpha!=="") {
    alp=alpha;
  }else{
    alp="01";
  }
  alp=((alp*255) | 1 << 8).toString(16).slice(1)
  hex=hex+alp;
  return "#"+hex;
}

  const [cmp, setCmp] = useState();
  useEffect( () => {
    localStorage.curPage=sdBarSt;
    if(localStorage.enalmsjwttkn && sdBarSt==="login")
      setSd("ana");
    setCmp(
      () => {
        if(sdBarSt === "dis" || sdBarSt === "dash" || sdBarSt === "bank" || sdBarSt === "equifax" || sdBarSt === "master" || sdBarSt === "report_status") 
          return (
            <section>
              <Sidebar
              onClickDis={onClickDis}
              onClickDash={onClickDash}
              onClickBank={onClickBank}
              onClickAna={onClickAna}
              onClickEfx={onClickEfx}
              onClickMaster={onClickMaster}
              onClickStatus={onClickStatus}
              initcol={initcol}
              />

              <Dashboard 
              dashName={sdBarSt}
              isLoad={isLoad}
              hndlViewMore={hndlViewMore}
              initcol={initcol}
              />
             
            </section>
          );
        else if(sdBarSt === "ana")
          return (
            <section>
              <Sidebar
                onClickDis={onClickDis}
                onClickDash={onClickDash}
                onClickBank={onClickBank}
                onClickAna={onClickAna}
                onClickEfx={onClickEfx}
                onClickMaster={onClickMaster}
                onClickStatus={onClickStatus}
                initcol={initcol}
              />
              <Analysis 
              isLoad={isLoad}
              initcol={initcol} 
              />
            </section>
          );
        else if(sdBarSt === "pmt")
          return (
            <section>
              <Sidebar
                onClickDis={onClickDis}
                onClickDash={onClickDash}
                onClickBank={onClickBank}
                onClickAna={onClickAna}
                onClickEfx={onClickEfx}
                onClickMaster={onClickMaster}
                onClickStatus={onClickStatus}
                selectTheme={selectTheme}
                initcol={initcol}
              />
            
              <MasterRepay lid={lid} isLoad={isLoad} initcol={initcol}/>
            </section>
            );
        else if(sdBarSt === "login") {
          return (
            <Login 
              hndlLogIn={hndlLogin}
              isLoad={isLoad} 
            />);
        }
    }
    );
  }, [sdBarSt,initcol]);

  const logout = () => {
    localStorage.clear();
    setSd("login");
  }

  if(col){
    ele=(
      <SweetAlert
       show={col}
       title=<p style={{color:"white"}}> Change Theme </p>
        style={{backgroundImage:`linear-gradient(rgb(26, 25, 25), ${initcol}`}}
         customButtons={<React.Fragment>
          <button onClick={closeColor} style={{margin:"20px",width: "120px",height:"40px"}}>Change</button>
          <button onClick={cancelColor} style={{margin:"20px",width: "120px",height:"40px"}}>Cancel</button>
        </React.Fragment>}
      ><div><center><ChromePicker color={initcol} onChange={handleChangeComplete}/></center></div>
        </SweetAlert>
    );
  }else{
    ele=null;
  }

  return (
    <div className="App">
      <Loader hide={hide}/>
      {ele}
      {cmp}
        
      {((sdBarSt !== "login") && (<div onClick={logout} style={{
        position:"fixed",
        bottom:"0",
        right:"0",
        color:"white",
        height:"2rem",
        width:"5rem",
        backgroundColor: "rgba(255,255,255,0.2)",
        margin:"0.5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: "0.5rem",
        fontSize:"0.8rem",
        cursor:"pointer"
      }}>
        <label style={{cursor:"pointer"}}>LOGOUT</label>
      </div>))}
      <div style={{
        position:"fixed",
        bottom:"0",
        left:"0",
        color:"white",
        height:"2rem",
        width:"auto",
        padding:"0.2rem 0.5rem 0.2rem 0.5rem",
        backgroundColor: "rgba(255,255,255,0.2)",
        margin:"0.5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: "0.5rem",
        fontSize:"0.8rem",
        cursor:"pointer",
        zIndex:"2"
      }}>
        <label style={{cursor:"pointer"}}>{localStorage.email}</label>
      </div>
      <div style={{
        position:"fixed",
        bottom:"0",
        right:"6rem",
        color:"white",
        height:"2rem",
        width:"auto",
        padding:"0.0rem 0.5rem 0.0rem 0.5rem",
        backgroundColor: "rgba(255,255,255,0.2)",
        margin:"0.5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: "0.5rem",
        fontSize:"0.8rem",
        cursor:"pointer",
        zIndex:"2"
      }} onClick={selectTheme}>
      <label> THEME</label></div>
    </div>
  );
}

export default App;
