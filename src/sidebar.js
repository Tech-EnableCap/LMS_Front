function SideBar(props) {
    return (
        <div className="sidebar">            
            <div className="sdmnu">
            <div className="sdHeader">ENA LMS</div>
                <div className="menuItems" onClick={props.onClickAna}><p><i className="fa fa-line-chart"></i> Analysis</p></div>
                <div className="menuItems" onClick={props.onClickDash}><p><i className="fa fa-address-card-o"></i> Uploaded Files</p></div>                
                <div className="menuItems" onClick={props.onClickDis}><p><i className="fa fa-money"></i> Disbursal MIS</p></div>
                <div className="menuItems" onClick={props.onClickBank}><p><i className="fa fa-bank"></i> Bank Upload File</p></div>
                <div className="menuItems" onClick={props.onClickEfx}><p><i className="fa fa-fax"></i> Equifax</p></div>
                <div className="menuItems" onClick={props.onClickMaster}><p><i className="fa fa-clock-o"></i> Master Repayment Schedule</p></div>
            </div>
        </div>
    );
}

export default SideBar;
