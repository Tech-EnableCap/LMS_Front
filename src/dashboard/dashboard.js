import RepUp from './uploadWidget';
import SearchBar from './searchBar.js';
import DtTable from './table';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {route} from '../route';

let idx=0;
let dtLen, totPage;
function Dashboard(props) {
    const [dName, setDName] = useState();
    const [tbDt, setTbDt] = useState({});
    const [inputVal, setInputVal] = useState({
        lid:"",
        fname:"",
        lname:"",
        stDate:"",
        enDate:"",
        comp:"Enablecap",
        dtCat:"first_inst_date"
    })
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
        else if(props.dashName === "master") {
            props.isLoad(true);
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();  
            setDName("Master Repayment Schedule");
            let srCr = {};
            srCr["stDate"] = yyyy + "-" + mm + "-" + dd;
            srCr["endDate"] = yyyy + "-" + mm + "-" + dd;
            srCr["comp"] = inputVal.comp;
            const header = {
                Authorization: "Bearer " + localStorage.enalmsjwttkn
            }
            console.log(header);
            axios.post(route + "/search_repay?idx=0", srCr, {headers:header})
                .then(res => {
                    //alert("OK");
                    //console.log(res);
                    if(!("data" in res.data.msg)) {
                        alert (res.data.msg.error);
                        setTbDt({});
                        props.isLoad(false);
                        return;
                    }
                    let col = res.data.msg.clName; //list / array
                    let data = res.data.msg.data; // list of list / 2d Array                    
                    dtLen = res.data.msg.count;
                    totPage = Math.ceil(dtLen / 20);                    
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
        setTbDt({});
        //search();
    }, [props.dashName]);


    //Upload file...................
    const upload = (key, fl) => {
        props.isLoad(true);
        let config = {
            headers: {
                "cors": "no-cors",
                "Authorization": "Bearer " + localStorage.enalmsjwttkn
            },
            onUploadProgress: function(progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }
        };

        let frmData = {};
        frmData[key] = fl;
    
        //console.log(frmData);
        axios.post(route, frmData, config).then((res) => {
            if("error" in res.data.msg) {
                alert("Something went wrong.");
                console.log(res.data.msg.error);
                props.isLoad(false);
                return;
            }

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
        let cnf = window.confirm("Your are uploading file for " + inputVal.comp);
        if(!cnf)
            return;
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
            upload("disbursement_"+inputVal.comp, reader.result);
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
        setInputVal({...inputVal, lid:e.target.value});
    }

    const fnameCh = (e) => {
        setInputVal({...inputVal, fname:e.target.value});
    }

    const lnameCh = (e) => {
        setInputVal({...inputVal, lname:e.target.value});
    }

    const stDateCh = (e) => {
        setInputVal({...inputVal, stDate:e.target.value});
    }

    const enDateCh = (e) => {
        setInputVal({...inputVal, enDate:e.target.value});
    }

    const dtCatCh = (e) => {
        setInputVal({...inputVal, dtCat:e.target.value});
    }
    
    const hndlReset = () => setInputVal({
        ...inputVal,
        lid:"",
        fname:"",
        lname:"",
        stDate:"",
        enDate:"",
        dtCat:"first_inst_date"
    })

    const compChange = (e) => {
        setInputVal({...inputVal, comp:e.target.value});
    }
    //==================================

    //Search through uploaded records........
    const search = (isNav=false) => {
        props.isLoad(true);
        let srCr = {};
        let canSend = true;
        if(inputVal.lid) {
            //alert("lid");
            srCr["lid"] = inputVal.lid;
        }
        else if(inputVal.fname || inputVal.lname) {
            //alert("name");
            srCr["fname"] = inputVal.fname;
            srCr["lname"] = inputVal.lname;
        }
        else if(inputVal.stDate && inputVal.enDate) {
            //alert("date");
            srCr["stDate"] = inputVal.stDate;
            srCr["endDate"] = inputVal.enDate;
            srCr["cat"] = inputVal.dtCat;
        }
        else {
            alert("Invalid search criteria.");
            props.isLoad(false);
            canSend = false;
        }
        srCr["comp"] = inputVal.comp;

        //console.log(srCr);
        if(canSend) {
            //srCr["idx"] = "0";
            let url;
            if(props.dashName === "dash") 
                url = route + "/viewupload?idx=" + idx;
            else if(props.dashName === "dis") 
                url = route + "/dmis?idx=" + idx;
            else if(props.dashName === "bank") 
                url = route + "/bankupload?idx=" + idx;
            else if(props.dashName === "master")
                url = route + "/search_repay?idx=" + idx;
            const header = {
                Authorization: "Bearer " + localStorage.enalmsjwttkn
            }
            axios.post(url, srCr, {headers:header})
                .then(res => {
                    //alert("OK");
                    //console.log(res);
                    if(!("data" in res.data.msg)) {
                        alert (res.data.msg.error);
                        setTbDt({});
                        props.isLoad(false);
                        return;
                    }
                    let col = res.data.msg.clName; //list / array
                    let data = res.data.msg.data; // list of list / 2d Array
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
        //alert(inputVal.comp);
        search();        
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
        //let srCr = [];
        let crit = {};
        let url;
        if(inputVal.lid) {
            //alert("lid");
            crit["lid"] = inputVal.lid;
        }
        else if(inputVal.fname || inputVal.lname) {
            //alert("name");
            crit["fname"] = inputVal.fname;
            crit["lname"] = inputVal.lname;
        }
        else if(inputVal.stDate && inputVal.enDate) {
            //alert("date");
            crit["stDate"] = inputVal.stDate;
            crit["endDate"] = inputVal.enDate;
            crit["cat"] = inputVal.dtCat;
        }
        crit["comp"] = inputVal.comp;
        if(props.dashName === "dash") 
            url = route + "/viewupload?idx=-2";
        else if(props.dashName === "dis") 
            url = route + "/dmis?idx=-2";
        else if(props.dashName === "bank") 
            url = route + "/bankupload?idx=-2";
        else if(props.dashName === "master")
            url = route + "/search_repay?idx=-2";
        
        const header = {
            Authorization: "Bearer " + localStorage.enalmsjwttkn
        }

        axios.post(url, crit, {headers:header})
        .then(res => {
            
            if(!("data" in res.data.msg)) {                
                alert (res.data.msg.error);
                props.isLoad(false);
                //setTbDt({});
                return;
            }

            /*if(lid) {            
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
            }*/

            let csvContent = ["\"" + res.data.msg.clName.join("\",\"") + "\"\n\"" 
            + res.data.msg.data.map(e => e.join("\",\"")).join("\"\n\"") + "\""];
            
            let blb = new Blob(csvContent, {type : "text/csv" });
            var hiddenElement = document.createElement('a');
            hiddenElement.href = window.URL.createObjectURL(blb);
            hiddenElement.download = dName + ".csv";
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

    
    useEffect(() => {
        if("clName" in tbDt) {
            let el = document.createElement('a');
            el.href="#dashTable";
            el.click();
            el.remove();
        }
    }, [tbDt]);

    return (
        <div className="dashboard">
            {/*<div className="dashHeader">
                                     
            </div>*/}
            <div className="dashBody">
                <SearchBar 
                    hndlSearch={srClick}
                    lidChange={lidCh} 
                    fnameChange={fnameCh} 
                    lnameChange={lnameCh} 
                    stDateChange={stDateCh} 
                    enDateChange={enDateCh} 
                    dtCatChange={dtCatCh} 
                    inputVal={inputVal}
                    hndlReset = {hndlReset}
                    compChange={compChange}
                />
                <DtTable 
                    Data={tbDt}
                    tbName={dName}
                    handlNavPrv={srPrv}
                    handlNavNxt={srNxt}
                    hndlDown={download}
                    hndlViewMore={props.hndlViewMore}
                    disOnChange={disOnChange}
                    eqOnChange={eqOnChange}
                />
            </div>
        </div>
    );
        
}

export default Dashboard;