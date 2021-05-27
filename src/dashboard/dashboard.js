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

    return (
        <div className="dashboard">
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
    );
        
}

export default Dashboard;