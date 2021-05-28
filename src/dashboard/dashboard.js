import RepUp from './uploadWidget';
import SearchBar from './searchBar.js';
import DtTable from './table';
import axios from 'axios';
import {tbData} from "./data";
import {useState, useEffect} from 'react';

function Dashboard() {
    const [tbDt, setTbDt] = useState();
    //Upload file...................
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

    //Handle table navigation...........
    const hndlNavPrv = () => {
        alert("There is no data.");
    }
    const hndlNavNxt = () => {
        alert("There is no data.");
    }
    //==================================
    let lid, fname, lname, stDate, enDate, dtCat="Sanc";
    //Handle searchBar Input Changes....
    const lidCh = (e) => {
        lid = e.target.value;
    }

    const fnameCh = (e) => {
        fname = e.target.value;
    }

    const lnameCh = (e) => {
        lname = e.target.value;
    }

    const stDateCh = (e) => {
        stDate = e.target.value;
    }

    const enDateCh = (e) => {
        enDate = e.target.value;
    }

    const dtCatCh = (e) => {
        dtCat = e.target.value;
    }
    //==================================

    //Search raw uploaded record........
    const search = () => {
        let srCr = {};
        let canSend = true;
        if(lid) {
            alert("lid");
            srCr["lid"] = lid;
        }
        else if(fname || lname) {
            alert("name");
            srCr["fname"] = fname;
            srCr["lname"] = lname;
        }
        else if(stDate && enDate) {
            alert("date");
            srCr["stDate"] = stDate;
            srCr["endDate"] = enDate;
            srCr["cat"] = dtCat;
        }
        else {
            alert("Invalid search criteria.");
            canSend = false;
        }
        if(canSend) {
            //srCr["idx"] = "0";
            axios.post('http://localhost:5000/viewupload?idx=0', srCr)
                .then(res => {
                    alert("OK");
                    console.log(res);
                })
                .catch(err => {
                    alert("Err");
                    console.log(err);
                });
        }
    }
    //==================================
    return (
        <div className="dashboard">
            <div className="dashHeader">
                <RepUp 
                icon="fa fa-upload"
                wdLabl="Upload Disbursement File"
                onChange={disOnChange}
                />
                <RepUp 
                icon="fa fa-upload"
                wdLabl="Upload Candidate Equifax"
                onChange={eqOnChange}
                />
            </div>
            <div className="dashBody">
                <SearchBar 
                hndlSearch={search}
                lidChange={lidCh} 
                fnameChange={fnameCh} 
                lnameChange={lnameCh} 
                stDateChange={stDateCh} 
                enDateChange={enDateCh} 
                dtCatChange={dtCatCh} 
                />
                <DtTable 
                Data={tbDt}
                tbName="Uploaded File"
                handlNavPrv={hndlNavPrv}
                handlNavNxt={hndlNavNxt}
                />
            </div>
        </div>
    );
        
}

export default Dashboard;