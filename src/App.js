import './App.css';
import Sidebar from './sidebar';
import Loader from './loader_modal';
import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard/dashboard';
import Analysis from './analysis';
import MasterRepay from './masterRepay/masterRepay';
import Login from './login/login';
let lid;
function App() {  
  useEffect(() => {
    if(typeof(Storage) === "undefined") {
      alert("LocalStorage not available, some plugins might be blocking it, try uninstalling them, or switch to different browser.");
      return;
    }
  }
  ,[]);
  let pg = (("curPgae" in localStorage) ? localStorage.curPage : "login");
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
    setCmp(
      () => {
        if(sdBarSt === "dis" || sdBarSt === "dash" || sdBarSt === "bank" || sdBarSt === "master") 
          return (
            <section>
              <Sidebar
              onClickDis={onClickDis}
              onClickDash={onClickDash}
              onClickBank={onClickBank}
              onClickAna={onClickAna}
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
  return (
    <div className="App">
      <Loader hide={hide}/>      
      
      {cmp}
      
    </div>
  );
}

export default App;
