import logo from './logo.svg'

function SideBar(props) {
    return (
        <div className="sidebar">
            <div className="sdHeader">
                ENA LMS
            </div>
            <img src={logo} className="prfImg" alt="prf"/>
            <ul>
                <li onClick={props.handleDis}>
                <i className="fa fa-upload"></i>
                 Upload Disbursement File
                 <input
                  hidden
                  id="fileUpload" 
                  type="file"
                  onChange={props.upDisOnChange}
                  />
                 </li>
                <li onClick={props.handleEq}>
                <i className="fa fa-upload"></i> 
                Upload Candidate Equifax
                <input
                  hidden
                  id="eqFileUpload" 
                  type="file"
                  onChange={props.upEqOnChange}
                  />
                </li>
                <li><i className="fa fa-line-chart"></i> Analysis</li>
                <li><i className="fa fa-money"></i> Disbursal MIS</li>
                <li><i className="fa fa-bank"></i> Bank Upload File</li>
                <li><i className="fa fa-clock-o"></i> Master Repayment Schedule</li>
                <li><i className="fa fa-bar-chart"></i> Entitled Score Analysis</li>
            </ul>
        </div>
    );
}

export default SideBar;
