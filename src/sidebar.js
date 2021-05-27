import logo from './logo.svg'

function SideBar(props) {
    return (
        <div className="sidebar">
            <div className="sdHeader">
                ENA LMS
            </div>
            <img src={logo} className="prfImg" alt="prf"/>
            <ul>
                <li><i className="fa fa-address-card-o"></i> Dashboard</li>
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
