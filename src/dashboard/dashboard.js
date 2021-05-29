import RepUp from './uploadWidget';
import SearchBar from './searchBar.js';
import DtTable from './table';
import axios from 'axios';
import {tbData} from "./data";
import {useState, useEffect} from 'react';

let lid, fname, lname, stDate, enDate, dtCat="sacntion_date", idx=0;
let dtLen, crPage, totPage;
function Dashboard(props) {
    const [dName, setDName] = useState();
    const [tbDt, setTbDt] = useState({});
    useEffect(() => {
        if(props.dashName === "dash") {
            setDName("Uploaded File");
        }
        else if(props.dashName === "dis") {
            setDName("Disbursal MIS");            
        }
        else if(props.dashName === "bank") {
            setDName("Bank Upload File");
        }
        setTbDt({});
        //search();
    }, [props.dashName]);


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
    const search = (isNav=false) => {
        let srCr = {};
        let canSend = true;
        if(lid) {
            //alert("lid");
            srCr["lid"] = lid;
        }
        else if(fname || lname) {
            //alert("name");
            srCr["fname"] = fname;
            srCr["lname"] = lname;
        }
        else if(stDate && enDate) {
            //alert("date");
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
            let url;
            if(props.dashName === "dash") 
                url = "http://localhost:5000/viewupload?idx=" + idx;
            else if(props.dashName === "dis") 
                url = "http://localhost:5000/dmis?idx=" + idx;
            else if(props.dashName === "bank") 
                url = "http://localhost:5000/bankupload?idx=" + idx;
            axios.post(url, srCr)
                .then(res => {
                    //alert("OK");
                    //console.log(res);
                    if(!("data" in res.data.msg)) {
                        alert (res.data.msg.error);
                        setTbDt({});
                        return;
                    }
                    let col = res.data.msg.clName;
                    let data = res.data.msg.data;
                    if(!isNav) {
                        dtLen = res.data.msg.count;
                        totPage = dtLen / 20;
                    }
                    let dt = {};
                    
                    dt["clName"] = col;
                    dt["data"] = data;
                    /*dt["dtLen"] = dtLen;
                    dt["curPage"] = idx + 1;
                    dt["totPage"] = totPage;*/
                    //console.log(res);                
                    //alert("Fetched...");
                    setTbDt(dt);
                })
                .catch(err => {
                    alert("Err");
                    console.log(err);
                });
        }
    }
    //==================================
    const srClick = () => {
        idx = 0;
        search()
    }
    const srNxt = () => {
        idx++;
        search();
    }
    const srPrv = () => {
        idx--;
        if(idx >= 0)
            search();
        else {
            idx = 0;
        }

    }

/*    useEffect(() => {
        alert(willShow);
        setShow(willShow);
    }, [tbDt]);*/

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
                hndlSearch={srClick}
                lidChange={lidCh} 
                fnameChange={fnameCh} 
                lnameChange={lnameCh} 
                stDateChange={stDateCh} 
                enDateChange={enDateCh} 
                dtCatChange={dtCatCh} 
                />
                <DtTable 
                Data={tbDt}
                tbName={dName}
                handlNavPrv={srPrv}
                handlNavNxt={srNxt}
                />
            </div>
        </div>
    );
        
}

export default Dashboard;