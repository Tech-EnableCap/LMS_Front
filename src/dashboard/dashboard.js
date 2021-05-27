import RepUp from './uploadWidget';
import axios from 'axios';

function Dashboard() {
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

    //Search raw uploaded record........
    const search = () => {
        alert("Searching...");
    }
    //==================================
    let style={
        borderRight:"2px solid red",
        borderLeft:"2px solid red",
        borderTop:"2px solid red",
        borderRadius:"5px",
        display: "inline-block",
        margin: "3px"
    };

    let srStl = {
        backgroundColor:"rgba(87,87, 85, 0.2)",
        paddingLeft:"20px",
        paddingRight:"20px",
        paddingTop:"3px",
        paddingBottom:"3px",
    }

    let btnStl = {
        width:"75px",
        height:"40px",
        borderRadius:"20px",
        display: "inline-block"
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
                <div className="searchBar" style={srStl}>
                    <h2>Search using...</h2>
                    <ul>
                        <div style={style}>
                            <li><label>Loan ID</label><br/> <input type="text" id="srLID" /></li>
                        </div>
                        <div style={style}>
                        <li><label>First Name</label><br/> <input type="text" id="fname" /></li>
                        <li><label>Last Name</label><br/> <input type="text" id="lname" /></li>
                        </div>
                        <div style={style}>
                        <li><label>Start Date</label><br/> <input type="date" id="stDate" /></li>
                        <li><label>End Date</label><br/> <input type="date" id="enDate" /></li>
                        </div><br/>
                        <li style={{
                            display:"block",
                            textAlign: "right"
                        }}><button style={btnStl} onClick={search}>Search</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
        
}

export default Dashboard;