import {useEffect, useState} from 'react';
import axios from 'axios';
import {route} from '../route';

function New_Pmt(props) {
    const [p_amt, setPAmt] = useState();
    const [rem, setRem] = useState();    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();    
    const [crDate, setCrDate] = useState(yyyy + "-" + mm + "-" + dd);
    const [frmData, setFrm] = useState({});    

    const search = () => {
        props.isLoad(true);
        let config = {
            "lid":props.lid,
            "date":crDate
        }
        axios.post(route + "/prfdt", config)
            .then(
                res => {
                    if("error" in res.data.msg) {
                        alert(res.data.msg.error);
                        props.isLoad(false);
                        return;
                    }
                    setFrm({
                        "pid":res.data.msg["pid"],
                        "fn":res.data.msg["fn"],//fn
                        "ln":res.data.msg["ln"],//ln
                        "emi":res.data.msg["emi"],//emi
                        "out":res.data.msg["out"],//emi
                        "due":res.data.msg["due"],//emi
                    });
                    props.isLoad(false);
                }
            )
            .catch(
                err => {
                    alert("Err");
                    console.log(err);
                    props.isLoad(false);
                }
            );
    }

    const hndlRChnge = (e) => {
        setRem(e.target.value);
    }

    const hndlPChnge = (e) => {
        setPAmt(e.target.value);        
    }
    
    const hndlSub = () => {
        props.isLoad(true);
        if(p_amt > parseInt(frmData["out"]) || !("out" in frmData)) {
            alert("Payment amount should not be greater than outstanding amount.");
            props.isLoad(false);
            return;
        }

        let config = {
            "lid":props.lid,            
            "pmt":p_amt,
            "date":crDate,
            "rem":rem
        }
        //console.log(config);
        axios.post(route + "/repay_track", config)
            .then(res => {
                if("error" in res.data.msg) {
                    alert(res.data.msg.error);
                    props.isLoad(false);
                    return;
                }
                alert("Payment Successful");
                props.isLoad(false);   
                search();             
            })
            .catch(e => {
                alert("Err...");
                props.isLoad(false);
                console.log(e);
            });
    }

    const hndlDateChnge = (e) => {
        setCrDate(e.target.value);
    }

    useEffect(() => search(), [crDate]);

    return (
        <div className="form">
            <h4><center>New Payment</center></h4>
            <table>
                <tr>
                <td><label>Loan / Transaction ID</label></td><td><label>{props.lid}</label></td>
                </tr>                    
                <tr>
                <td><label>Partner ID</label></td><td><label>{frmData["pid"]}</label></td>
                </tr>                    
                <tr>
                <td><label>First Name</label></td><td><label>{frmData["fn"]}</label></td>
                </tr>
                <tr>
                <td><label>Last Name</label></td><td><label>{frmData["ln"]}</label></td>
                </tr>
                <tr>
                <td><label>EMI Amount (Rs.)</label></td><td><label>{frmData["emi"]}</label></td>
                </tr>
                <tr>
                <td><label>Total Due (Rs.)<br/><i>*As of today</i></label></td><td><label>{frmData["due"]}</label></td>
                </tr>
                <tr>
                <td><label>Total Outstanding (Rs.)<br/></label></td><td><label>{frmData["out"]}</label></td>
                </tr>
                <tr>
                <td><label>Payment Amount (Rs.)</label></td><td><input type="number" value={p_amt} onChange={hndlPChnge}/></td>
                </tr>
                <tr>
                <td><label>Payment Date </label></td><td><input type="date" value={crDate} onChange={hndlDateChnge}/></td>
                </tr>
                <tr>
                <td><label>Remarks </label></td><td><textarea value={rem} onChange={hndlRChnge}/></td>
                </tr>
                <tr>
                <td></td><td><button className="rpsb" onClick={hndlSub}>Submit</button></td>
                </tr>
            </table>                        
        </div>            
    );
}

export default New_Pmt;