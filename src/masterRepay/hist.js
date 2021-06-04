import {useEffect, useState} from 'react';
import axios from 'axios';
import {route} from '../route';

function Hist(props) {
    const [frmData, setFrm] = useState({});
    const [hist, setHist] = useState({});
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();  
    var crDate = yyyy + "-" + mm + "-" + dd;
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
                        "status":res.data.msg["status"]//emi                        
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

    useEffect(() => {
        search();
        let config = {
            "lid":props.lid
        }
        axios.post(route + "/track_history", config)
            .then( res => {
                setHist({                                          
                    "data":res.data.msg.data
                });
            }
        )
        .catch(err => {
            alert("Couldn't fetch info.");
            console.log(err);
        });
    }
    , []);

    return (
        <div className="pmt_hist">
            <div className="prf_dt">
                <div className="form">
                    <h4><center>Profile Details</center></h4>
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
                        <td><label>Loan Status<br/></label></td><td><label>{frmData["status"]}</label></td>                        
                        </tr>                    
                    </table>                        
                </div>
            </div>
            <div className="pmt_sch">
                <div className="form">
                        <h4><center>Payment History</center></h4>
                        <table>
                            <thead>
                                <tr>                                    
                                    <td>Recieved Date</td>    
                                    <td>Recieved Amt. (Rs.)</td>                                        
                                    {/*<td>Supposed Recieve Date</td>    */}
                                    <td>Amount Due (Rs.)</td>    
                                    <td>Amount Carried Forward (Rs.)</td>    
                                    <td>Status</td>  
                                    <td>Remarks</td>  
                                </tr>     
                            </thead>
                            <tbody>
                                {("data" in hist) && hist["data"].map(
                                    (row) => (<tr>{row.map((val) => (<td>{val}</td>))}</tr>))}
                            </tbody>
                        </table>                        
                    </div>
            </div>
        </div> 
    );
}

export default Hist;