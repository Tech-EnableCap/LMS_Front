function SideBar(props) {
    return (
        <div className="sidebar" style={{backgroundImage:`linear-gradient(to top, rgb(26, 25, 25), ${props.initcol}`}}>            
            <div className="sdmnu">
                <div className="sdHeader"><label className="sdLabel">ENA LMS</label>
                <div className="arrow"><i className="fa fa-angle-double-right"></i></div>
                </div>
                <div className="menuItems" onClick={props.onClickAna}><p><i className="fa fa-line-chart"></i> <label className="sdLabel">Analysis</label></p></div>
                <div className="menuItems" onClick={props.onClickDash}><p><i className="fa fa-address-card-o"></i> <label className="sdLabel">Uploaded Files</label></p></div>                
                <div className="menuItems" onClick={props.onClickDis}><p><i className="fa fa-money"></i> <label className="sdLabel">Disbursal MIS</label></p></div>
                <div className="menuItems" onClick={props.onClickBank}><p><i className="fa fa-bank"></i> <label className="sdLabel">Bank Upload File</label></p></div>
                <div className="menuItems" onClick={props.onClickEfx}><p><i className="fa fa-fax"></i> <label className="sdLabel">Equifax</label></p></div>
                <div className="menuItems" onClick={props.onClickMaster}><p><i className="fa fa-clock-o"></i> <label className="sdLabel">Master Repayment Schedule</label></p></div>
                <div className="menuItems" onClick={props.onClickStatus}><p><i className="fa fa-bar-chart"></i> <label className="sdLabel">Loan Performance Report</label></p></div>
                <div className="menuItems" onClick={props.onClickRepayTrack}><p><i className="fa fa-calendar"></i> <label className="sdLabel">Repay Tracker</label></p></div>
            </div>
        </div>
    );
}

export default SideBar;
