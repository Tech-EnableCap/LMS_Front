import './ms.css';
import {useState, useEffect} from 'react';
import NewPmt from './new_pmt';
import Hist from './hist';

function MasterRepaySch(props) {  
    const [st, setSt] = useState("hist");

    const hndlNew = () => {
        setSt("new");        
    }

    const hndlHist = () => {
        setSt("hist");
    }

    let sh;
    (st === "new") && (sh=<NewPmt lid={props.lid} isLoad={props.isLoad} email={props.email}/>);
    (st === "hist") && (sh=<Hist lid={props.lid} isLoad={props.isLoad} email={props.email}/>);
    return (
        <div className="master" style={{backgroundImage:`linear-gradient(rgb(26, 25, 25), ${props.initcol}`}}>
            <h2><center>Loan Repayment Details</center></h2>
            <h4><center>Loan ID: {props.lid}</center></h4>
            <div className="canvas" id="can">
                <div className="menu">
                    <label style={{backgroundImage:`linear-gradient(rgb(26, 25, 25), ${props.initcol}`,border: `2px solid ${props.initcol}`}} onClick={hndlNew}><p>New Payment</p></label>
                    <label style={{backgroundImage:`linear-gradient(rgb(26, 25, 25), ${props.initcol}`,border: `2px solid ${props.initcol}`}} onClick={hndlHist}><p>Payment History</p></label>                    
                </div>  
                {sh}
                </div>
        </div>
    );
}

export default MasterRepaySch;