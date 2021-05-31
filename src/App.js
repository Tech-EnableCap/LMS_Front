import './App.css';
import Sidebar from './sidebar';
import Loader from './loader_modal';
import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard/dashboard';
import Analysis from './analysis';
import MasterRepay from './masterRepay/masterRepay';

function App() {  
  const [sdBarSt, setSd] = useState("master"); //change default value to "ana"
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
  const [cmp, setCmp] = useState();
  useEffect( () => {
    setCmp(
      () => {
        if(sdBarSt === "dis" || sdBarSt === "dash" || sdBarSt === "bank" || sdBarSt === "master") 
          return (<Dashboard 
            dashName={sdBarSt}
            isLoad={isLoad}
          />);
        else if(sdBarSt === "ana")
          return (<Analysis 
            isLoad={isLoad}  
          />);
        /*else if(sdBarSt === "master")
          return (<MasterRepay />);*/
    }
    );
  }, [sdBarSt]);
  return (
    <div className="App">
      <Loader hide={hide}/>      
      <Sidebar
        onClickDis={onClickDis}
        onClickDash={onClickDash}
        onClickBank={onClickBank}
        onClickAna={onClickAna}
        onClickMaster={onClickMaster}
       />
      {cmp}
      
    </div>
  );
}

export default App;
