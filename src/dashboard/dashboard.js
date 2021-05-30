import RepUp from './uploadWidget';
import SearchBar from './searchBar.js';
import DtTable from './table';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {route} from '../route';

let lid, fname, lname, stDate, enDate, dtCat="sacntion_date", idx=0;
let dtLen, totPage;
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
        props.isLoad(true);
        let config = {
            headers: {
                "cors": "no-cors",
            },
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }
        };

        let frmData = {};
        frmData[key] = fl;
    
        console.log(frmData);
        axios.post(route, frmData, config).then(() => {
            alert("Successfully Uploaded.");
            props.isLoad(false);
        }).catch(e => {
            console.log(e);
            props.isLoad(false);
            alert("Error occurred.")
        })
    }
    //==================================

    //Uploading disbusrsement file......
    const disOnChange = (e) => {
        let file = e.target.files[0];
        e.target.value = null;
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
        e.target.value = null;
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
        props.isLoad(true);
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
            props.isLoad(false);
            canSend = false;
        }
        if(canSend) {
            //srCr["idx"] = "0";
            let url;
            if(props.dashName === "dash") 
                url = route + "/viewupload?idx=" + idx;
            else if(props.dashName === "dis") 
                url = route + "/dmis?idx=" + idx;
            else if(props.dashName === "bank") 
                url = route + "/bankupload?idx=" + idx;
            axios.post(url, srCr)
                .then(res => {
                    //alert("OK");
                    //console.log(res);
                    if(!("data" in res.data.msg)) {
                        alert (res.data.msg.error);
                        setTbDt({});
                        props.isLoad(false);
                        return;
                    }
                    let col = res.data.msg.clName;
                    let data = res.data.msg.data;
                    if(!isNav) {
                        dtLen = res.data.msg.count;
                        totPage = Math.ceil(dtLen / 20);
                    }
                    let dt = {};
                    
                    dt["clName"] = col;
                    dt["data"] = data;
                    dt["dtLen"] = dtLen;
                    dt["curPage"] = idx + 1;
                    dt["totPage"] = totPage;
                    //console.log(res);                
                    //alert("Fetched...");
                    setTbDt(dt);
                    props.isLoad(false);
                })
                .catch(err => {
                    alert("Err");
                    console.log(err);
                    props.isLoad(false);
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
        if(idx + 1 > totPage) {
            idx = totPage - 1;
        }
        else {
            search(true);
        }
    }
    const srPrv = () => {
        idx--;
        if(idx >= 0)
            search(true);
        else {
            idx = 0;
        }

    }

    const download = () => {
        props.isLoad(true);
        let srCr = [];
        let crit = {};
        let url;
        if(lid) {
            //alert("lid");
            crit["lid"] = lid;
        }
        else if(fname || lname) {
            //alert("name");
            crit["fname"] = fname;
            crit["lname"] = lname;
        }
        else if(stDate && enDate) {
            //alert("date");
            crit["stDate"] = stDate;
            crit["endDate"] = enDate;
            crit["cat"] = dtCat;
        }
        if(props.dashName === "dash") 
            url = route + "/viewupload?idx=-2";
        else if(props.dashName === "dis") 
            url = route + "/dmis?idx=-2";
        else if(props.dashName === "bank") 
            url = route + "/bankupload?idx=-2";
        axios.post(url, crit)
        .then(res => {
            
            if(!("data" in res.data.msg)) {
                alert (res.data.msg.error);
                //setTbDt({});
                return;
            }

            if(lid) {            
                srCr.push(lid);
            }
            else if(fname || lname) {            
                srCr.push(fname);
                srCr.push(lname);
            }
            else if(stDate && enDate) {            
                srCr.push(stDate);
                srCr.push(enDate);
                srCr.push(dtCat);
            }

            let csvContent = ["\"" + res.data.msg.clName.join("\",\"") + "\"\n\"" 
            + res.data.msg.data.map(e => e.join("\",\"")).join("\"\n\"") + "\""];
            
            let blb = new Blob(csvContent, {type : "text/csv" });
            var hiddenElement = document.createElement('a');
            hiddenElement.href = window.URL.createObjectURL(blb);
            hiddenElement.download = dName + "_" + srCr.join("_") + ".csv";
            hiddenElement.click();
            window.URL.revokeObjectURL(hiddenElement.href);
            hiddenElement.remove();
            props.isLoad(false);
        })
        .catch(err => {
            console.log(err);
            props.isLoad(false);
        });
        
    }

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
                hndlDown={download}
                />
            </div>
        </div>
    );
        
}

export default Dashboard;