import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {
  const [selectFile, setFile] = useState();

  //upload file...................
  const upload = (key, fl) => {
    let config = {
      headers: {
        "cors": "no-cors",
      }
    };

    let frmData = {};
    frmData[key] = fl;
  
    console.log(frmData);
    axios.post("http://localhost:5000", frmData, config).then(() => {
      alert("Successfully Uploaded.");
    }).catch(e => {
      console.log(e);
      alert("Error occurred.")
    })
  }
//==================================

//Onclick handler of upload disbursement button.....
const handleDis = (e) => {
  let ip = document.getElementById("fileUpload");
  ip.click();
}
//=============================================

//Uploading disbusrsement file......
  const disOnChange = (e) => {
    let file = e.target.files[0];
    if(file === undefined)
      return;
    let fl = file.name.split(".");
    let ext = fl[fl.length - 1]
    if(ext !== "xlsx" && ext !== "xls") {
      alert("Invalid file format " + ext);
      return;
    }
    //Encoding to base64.......
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      upload("disbursement", reader.result);
    };
    //==========================
  }
  //==================================

  //Onclick handler of upload disbursement button.....
  const handleEq = (e) => {
    let ip = document.getElementById("eqFileUpload");
    ip.click();
  }
  //=============================================

  //Uploading equifax file......
  const eqOnChange = (e) => {
    let file = e.target.files[0];
    if(file === undefined)
      return;
    let fl = file.name.split(".");
    let ext = fl[fl.length - 1]
    if(ext !== "xlsx" && ext !== "xls") {
      alert("Invalid file format " + ext);
      return;
    }
    //Encoding to base64.......
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      upload("efx", reader.result);
    };
    //==========================
  }
  //==================================

  return (
    <div className="App">
      <Sidebar
       handleDis={handleDis}
       upDisOnChange={disOnChange}
       handleEq={handleEq}
       upEqOnChange={eqOnChange}
       />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
