import './ms.css';
import {useState, useEffect} from 'react';
import New_Pmt from './new_pmt';
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
    (st === "new") && (sh=<New_Pmt lid={props.lid} isLoad={props.isLoad} />);
    (st === "hist") && (sh=<Hist lid={props.lid} isLoad={props.isLoad} />);
    return (
        <div className="master">
            <h2><center>Loan Repayment Details</center></h2>
            <h4><center>Loan ID: {props.lid}</center></h4>
            <div className="canvas" id="can">
                <div className="menu">
                    <label onClick={hndlNew}><p>New Payment</p></label>
                    <label onClick={hndlHist}><p>Payment History</p></label>                    
                </div>  
                {sh}
                </div>
        </div>
    );
}

export default MasterRepaySch;