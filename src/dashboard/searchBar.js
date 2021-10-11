import Select from 'react-select';


function SearchBar(props) { //Some of the styling elements are in the css...

    let style={
        borderRight:"2px solid red",
        borderLeft:"2px solid red",
        borderTop:"2px solid red",
        borderRadius:"5px",        
        display:"inline-block",
        margin: "3px",
    };

    let srStl = {
        backgroundColor:"rgba(87,87, 85, 0.1)",
        borderRadius: "10px",
        paddingLeft:"20px",
        paddingRight:"20px",
        paddingTop:"3px",
        paddingBottom:"3px",
    }

    let btnStl = {
        width:"110px",
        height:"40px",
        borderRadius:"20px",
        display: "inline-block",
        margin: "5px",
        fontSize: "12px"
    }

    let element_block=null;
    let search_block=null;
    let search_by_status=null;
    let outblock=null;
    let dueblock=null;
    if(props.dname==="equifax"){
        outblock=null;
        dueblock=null;
        search_by_status=null;
        search_block=(
            <div style={props.stDateChange ? style : {display: "none"}}>
                <li><label>Start Date</label><br/> <input type="date" id="stDate" value={props.inputVal.stDate} onChange={props.stDateChange}  /></li>
                <li><label>End Date</label><br/> <input type="date" id="enDate" value={props.inputVal.enDate} onChange={props.enDateChange}  /></li>
                <li>
                    <label>Date Category</label><br/> 
                    <select name="cat" id="dtCat" value={props.inputVal.dtCat} onChange={props.dtCatChange} >
                        <option value="first_inst_date">EMI Date</option>
                        <option value="sacntion_date">Sanction Date</option>
                        <option value="loan_app_date">Loan Application Date</option>
                        <option value="disburse_date">Disburse Date</option>
                        <option value="final_approve_date">Final Approval Date</option>
                        <option value="joining_date">Joining Date</option>
                    </select>
                </li>
            </div>
        );
        element_block=(
            <div style={{
                display: "inline-block",
                textAlign: "left",
                marginRight: "1rem",
            }}>
                <label>Loan Status</label><br/>
                <select style={{
                    height:"2rem",
                    padding: "0.2rem",
                    marginTop:"0.2rem"
                }} name="loan" id="loan" value={props.inputVal.status} onChange={props.handleStatus}>
                    <option value="ongoing">Ongoing</option>
                    <option value="complete">Completed</option>                       
                </select>
            </div>
        );
    }else if(props.dname==="repay_tracker"){
        search_by_status=null;
       search_block=(
            <div style={props.stDateChange ? style : {display: "none"}}>
                <li><label>Start Date</label><br/> <input type="date" id="stDate" value={props.inputVal.stDate} onChange={props.stDateChange}  /></li>
                <li><label>End Date</label><br/> <input type="date" id="enDate" value={props.inputVal.enDate} onChange={props.enDateChange}  /></li>
                <li>
                    <label>Category</label><br/> 
                    <select name="repay_type" id="repay_type" value={props.inputVal.repay_type} onChange={props.repayHandler} >
                        <option value="repay_tracker">Repay Tracker</option>
                        <option value="analysis">Day by day due</option>
                    </select>
                </li>
            </div>
        );
       /*dueblock=(
            <div style={{
                display: "inline-block",
                textAlign: "left",
                marginRight: "3rem",
            }}>
                <button style={btnStl} onClick={props.hndlDue}>View Due</button>
                </div>
        );*/

    }
    else if(props.dname==="report_status"){
        /*search_block=(
            <div style={props.stDateChange ? style : {display: "none"}}>
                <li><label>Start Date</label><br/> <input type="date" id="stDate" value={props.inputVal.stDate} onChange={props.stDateChange}  /></li>
                <li><label>End Date</label><br/> <input type="date" id="enDate" value={props.inputVal.enDate} onChange={props.enDateChange}  /></li>
            </div>
        );*/
        search_block=null;
        search_by_status=(
             <div style={props.showHandle ? style : {display: "none"}}>
             <label>Loan Status</label>
            <Select isMulti options={props.options} onChange={props.showHandle} theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
              ...theme.colors,
                neutral0:'black',
                text: 'orangered',
                primary25: '#d4cdd0',
                primary: 'black',
              },
            })}/>
            </div>
        );

        outblock=(
            <div style={{
                        display: "inline-block",
                        textAlign: "left",
                        marginRight: "2rem",
                    }}>
                        <button style={btnStl} onClick={props.hndlOut}>OUTSTANDING</button>
                        </div>
        );

        dueblock=null;

    }else{
        search_block=(
            <div style={props.stDateChange ? style : {display: "none"}}>
                <li><label>Start Date</label><br/> <input type="date" id="stDate" value={props.inputVal.stDate} onChange={props.stDateChange}  /></li>
                <li><label>End Date</label><br/> <input type="date" id="enDate" value={props.inputVal.enDate} onChange={props.enDateChange}  /></li>
                <li>
                    <label>{props.dname==="user_log" ? "Job Type" : "Date Category"}</label><br/> 
                    <select name="cat" id="dtCat" value={props.dname==="user_log" ? props.inputVal.job_type : props.inputVal.dtCat} onChange={props.dname==="user_log" ? props.jobTypeChng : props.dtCatChange} >
                        {props.dname==="user_log" ? 
                        (<><option value="login">Login</option>
                        <option value="upload">Upload Loan Details</option>
                        <option value="view_upload">Search Upload File</option>
                        <option value="payment">Make Payment</option>
                        <option value="rt_details">View Individual Payment Track</option>
                        <option value="eqfx">Generate Equifax</option>
                        <option value="upload_reco">Upload Reconciliation File</option>
                        <option value="view_analysis">View Analysis Data</option>
                        <option value="disbursal_mis">Generate Disbursal MIS File</option>
                        <option value="bank_upload">Generate Bank Upload File</option>
                        <option value="master_repay_search">Search Master Repay</option>
                        <option value="loan_report_search">Search Loan Report</option>
                        <option value="cron">Trigger Status Update</option>
                        <option value="rt_search">Search Repayment Tracker</option>
                        <option value="dbd_due_search">Search Day By Day Due</option>
                        <option value="download_upload">Download Upload File</option>
                        <option value="download_eqfx">Download Equifax File</option>
                        <option value="download_dmis">Download Disbursal MIS File</option>
                        <option value="download_bank_up">Download Bank Upload File</option>
                        <option value="download_mr">Download Master Repay File</option>
                        <option value="download_lp">Download Loan Performance Report</option>
                        <option value="download_rt">Download Repay Tracker File</option>
                        <option value="download_dbd_due">Download Day By Day Due</option>
                        </>
                        )
                        : (<><option value="first_inst_date">EMI Date</option>
                        <option value="sacntion_date">Sanction Date</option>
                        <option value="loan_app_date">Loan Application Date</option>
                        <option value="disburse_date">Disburse Date</option>
                        <option value="final_approve_date">Final Approval Date</option>
                        <option value="joining_date">Joining Date</option></>)}
                    </select>
                </li>
            </div>
        );
        search_by_status=null;
        outblock=null;
        dueblock=null;
    }
    
    return (
        <div className="searchBar" style={srStl}>
            <i className="fa fa-search" style={{display:"inline", fontSize:"23px"}}></i> 
            <h2 style={{display:"inline"}}> Search using...</h2>
            <ul>
                <div style={props.lidChange ? style : {display: "none"}}>
                    <li><label>{props.dname==="user_log" ? "Email ID" : "Loan ID"}</label><br/> <input type="text" id="srLID" value={props.inputVal.lid} onChange={props.lidChange} /></li>
                </div>
                
                {props.dname!=="user_log" && <div style={props.fnameChange ? style : {display: "none"}}>
                    <li><label>First Name</label><br/> <input type="text" id="fname" value={props.inputVal.fname} onChange={props.fnameChange} /></li>
                    <li><label>Last Name</label><br/> <input type="text" id="lname" value={props.inputVal.lname} onChange={props.lnameChange} /></li>
                </div>}

                {search_block}

                {search_by_status}


                <br/>
                <li style={{
                display:"block",
                textAlign: "right"
                }}>
                {props.dname==="report_status" && <div style={{
                            display: "inline-block",
                            textAlign: "left",
                            marginRight: "2rem",
                        }}>
                            <button style={btnStl} onClick={props.cronJob}>UPDATE</button>
                            </div>}

                    {outblock}

                    {element_block}

                   

                    {props.dname!=="user_log" && <div style={{
                        display: "inline-block",
                        textAlign: "left",
                        marginRight: "1rem",
                    }}>
                        <label>Company</label><br/>
                        <select style={{
                            height:"2rem",
                            padding: "0.2rem",
                            marginTop:"0.2rem"
                        }} name="company" id="company" value={props.inputVal.comp} onChange={props.compChange} >
                            <option value="Enablecap">EnableCap</option>
                            <option value="Entitle">Entitle</option>                        
                        </select>
                        </div>}
                         {dueblock}
                    <button style={btnStl} onClick={props.hndlReset}>RESET</button>
                    <button style={btnStl} onClick={props.hndlSearch}>SEARCH</button>
                </li>
            </ul>
        </div>
    );
}

export default SearchBar;