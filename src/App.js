import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Dashboard from './dashboard/dashboard';


function App() {  
  const [sdBarSt, setSd] = useState("dash")

  const onClickBank = () => {
    setSd("bank");
  }
  const onClickDis = () => {
    setSd("dis");
  }
  const onClickDash = () => {
    setSd("dash");
  }
  
  return (
    <div className="App">
      <Sidebar
      onClickDis={onClickDis}
      onClickDash={onClickDash}
      onClickBank={onClickBank}
       />
      <Dashboard 
        dashName={sdBarSt}
      />
    </div>
  );
}

export default App;
