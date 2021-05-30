import logo from './logo.svg'

function SideBar(props) {
    return (
        <div className="sidebar">
            <div className="sdHeader">
                ENA LMS
            </div>
            <img src={logo} className="prfImg" alt="prf"/>
            <ul>
                <li onClick={props.onClickAna}><i className="fa fa-line-chart"></i> Analysis</li>
                <li onClick={props.onClickDash}><i className="fa fa-address-card-o"></i> Uploaded Files</li>                
                <li onClick={props.onClickDis}><i className="fa fa-money"></i> Disbursal MIS</li>
                <li onClick={props.onClickBank}><i className="fa fa-bank"></i> Bank Upload File</li>
                <li><i className="fa fa-clock-o"></i> Master Repayment Schedule</li>
            </ul>
        </div>
    );
}

export default SideBar;
