import './App.css';
import Sidebar from './sidebar';
import Loader from './loader_modal';
import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard/dashboard';
import Analysis from './analysis';


function App() {  
  const [sdBarSt, setSd] = useState("ana");
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
  const isLoad = (e) => {
    setHide(!e);
  }
  const [cmp, setCmp] = useState();
  useEffect( () => {
    setCmp((sdBarSt !== "ana") ?
    (<Dashboard 
    dashName={sdBarSt}
    isLoad={isLoad}
    />) : (<Analysis 
    isLoad={isLoad}  
    />));
  }, [sdBarSt]);
  return (
    <div className="App">
      <Loader hide={hide}/>      
      <Sidebar
      onClickDis={onClickDis}
      onClickDash={onClickDash}
      onClickBank={onClickBank}
      onClickAna={onClickAna}
       />
      {cmp}
      
    </div>
  );
}

export default App;
