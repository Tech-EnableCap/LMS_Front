import './App.css';
import Sidebar from './sidebar';
import Loader from './loader_modal';
import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard/dashboard';
import Analysis from './analysis';
import MasterRepay from './masterRepay/masterRepay';
import Login from './login/login';
let lid,pg;
function App() {  
  useEffect(() => {
    if(typeof(Storage) === "undefined") {
      alert("LocalStorage not available, some plugins might be blocking it, try uninstalling them, or switch to different browser.");
      return;
    }
  }
  ,[]);
  const [sdBarSt, setSd] = useState("login"); //change default value to "ana"
  const [hide, setHide] = useState(true);  
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

  const [cmp, setCmp] = useState();
  useEffect( () => {
    localStorage.curPage=sdBarSt;
    if(localStorage.enalmsjwttkn && sdBarSt==="login")
      setSd("ana");
    setCmp(
      () => {
        if(sdBarSt === "dis" || sdBarSt === "dash" || sdBarSt === "bank" || sdBarSt === "equifax" || sdBarSt === "master") 
          return (
            <section>
              <Sidebar
              onClickDis={onClickDis}
              onClickDash={onClickDash}
              onClickBank={onClickBank}
              onClickAna={onClickAna}
              onClickEfx={onClickEfx}
              onClickMaster={onClickMaster}
              />
              <Dashboard 
              dashName={sdBarSt}
              isLoad={isLoad}
              hndlViewMore={hndlViewMore}
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
              />
              <Analysis 
              isLoad={isLoad}  
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
              />
            
              <MasterRepay lid={lid} isLoad={isLoad}/>
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
  }, [sdBarSt]);

  const logout = () => {
    localStorage.clear();
    setSd("login");
  }

  return (
    <div className="App">
      <Loader hide={hide}/>      
      
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
    </div>
  );
}

export default App;
