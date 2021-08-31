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
    }
    if(props.dname==="report_status"){
        search_block=(
            <div style={props.stDateChange ? style : {display: "none"}}>
                <li><label>Start Date</label><br/> <input type="date" id="stDate" value={props.inputVal.stDate} onChange={props.stDateChange}  /></li>
                <li><label>End Date</label><br/> <input type="date" id="enDate" value={props.inputVal.enDate} onChange={props.enDateChange}  /></li>
            </div>
        );
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
                    }}>
                        <button style={btnStl} onClick={props.hndlOut}>OUTSTANDING</button>
                        </div>
        );

         dueblock=(
            <div style={{
                        display: "inline-block",
                        textAlign: "left",
                        marginRight: "3rem",
                    }}>
                        <button style={btnStl} onClick={props.hndlDue}>View Due</button>
                        </div>
        );


    }else{
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
        search_by_status=null;
        outblock=null;
    }
    
    return (
        <div className="searchBar" style={srStl}>
            <i className="fa fa-search" style={{display:"inline", fontSize:"23px"}}></i> 
            <h2 style={{display:"inline"}}> Search using...</h2>
            <ul>
                <div style={props.lidChange ? style : {display: "none"}}>
                    <li><label>Loan ID</label><br/> <input type="text" id="srLID" value={props.inputVal.lid} onChange={props.lidChange} /></li>
                </div>
                <div style={props.fnameChange ? style : {display: "none"}}>
                    <li><label>First Name</label><br/> <input type="text" id="fname" value={props.inputVal.fname} onChange={props.fnameChange} /></li>
                    <li><label>Last Name</label><br/> <input type="text" id="lname" value={props.inputVal.lname} onChange={props.lnameChange} /></li>
                </div>

                {search_block}

                {search_by_status}


                <br/>
                <li style={{
                display:"block",
                textAlign: "right"
                }}>
                    {element_block}

                   

                    <div style={{
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
                        </div>
                        {outblock}
                         {dueblock}
                    <button style={btnStl} onClick={props.hndlReset}>RESET</button>
                    <button style={btnStl} onClick={props.hndlSearch}>SEARCH</button>
                </li>
            </ul>
        </div>
    );
}

export default SearchBar;