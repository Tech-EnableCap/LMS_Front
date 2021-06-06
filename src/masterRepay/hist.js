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

    useEffect(() => search(), []);

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
                        "out":res.data.msg["out"],//outstanding
                        "due":(parseInt(res.data.msg["out"]) ? res.data.msg["due"] : "0"),//total due
                        "status":res.data.msg["status"]//loan status                        
                    });
                    let emi = res.data.msg["emi"];
                    let conf = {
                        "lid":props.lid
                    }
                    axios.post(route + "/track_history", conf)
                        .then( res => {                
                            if(!("data" in res.data.msg))
                            {
                                //alert(res.data.msg.error);
                                props.isLoad(false);
                                return;
                            }
                            processStatus(res.data.msg.data, emi);
                            props.isLoad(false);
                        }
                    )
                    .catch(err => {
                        alert("Couldn't fetch info.");
                        console.log(err);
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

    const processStatus = (data, emi) => {
        let st = {
            po:"Paid On Time",
            pl:"Paid Late",
            ad:"Advance Pay",
            pr:"Partial Pay"
        }

        let payIdx=1, isEdIdx=6, stIdx=4; //stIdx -> status col
        let p=0;
        if(data.length <= 0)
            return;
             
        let nonZeroIdx = 0;
        for(nonZeroIdx=data.length-1;nonZeroIdx>=0;nonZeroIdx--) {            
            if(parseInt(data[nonZeroIdx][payIdx]) > 0)
                break;
        }        

        for(let u=0;u<data.length;u++) {
            data[u][stIdx] = "";
            (data[u][isEdIdx] === "ed") ? (data[u][isEdIdx] = "***") : (data[u][isEdIdx] = "---");
        }

        for(let i=0;i<=nonZeroIdx;i++) {
            p += parseInt(data[i][payIdx]);

            let totPay = parseInt(Math.floor(p / parseInt(emi)));            
            let isPar = parseInt(p % parseInt(emi));
            isPar && (totPay++);           
            for(let j=0,k=0;(j<data.length)&&(k<totPay);j++) {                                
                if(data[j][isEdIdx] === "---" || data[j][isEdIdx] === "pd") {
                    continue;
                }
                if(data[j][stIdx] === st.po || data[j][stIdx] === st.ad)    {
                    k++;
                    continue;
                }                
                if(i == j)
                    data[j][stIdx] = st.po;
                else if(j < i)
                    data[j][stIdx] = st.pl;
                else if(j > i)
                    data[j][stIdx] = st.ad;                                
                
                if(isPar && k==totPay-1)
                    data[j][stIdx] += " , " + st.pr;
                k++;
            }
        }

        setHist({
            "data": data
        })

        let el = document.createElement('a');
        el.setAttribute('href', "#can");
        el.click();
        el.remove();   
    }

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
                        <td><label>Total Due + Overdue (Rs.)<br/><i>*As of today</i></label></td><td><label>{frmData["due"]}</label></td>
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