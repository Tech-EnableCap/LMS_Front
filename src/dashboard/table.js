import RepUp from './uploadWidget';

function DtTable(props) {
    //let show = (props.show ? "dtTab" : "dtTab hide");
    const show = "dtTab";   
    const btstl = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        height: "35px",
        width: "90px",
        borderRadius: "8px",
        background:"#3468eb",
        color:"white",
        fontSize: "12px"
    } 
    return (
        <div className="table" id="dashTable">
            <div className="tbHeader">
                <label>{"dtLen" in props.Data ? props.Data["dtLen"] : "0"} entries found | Showing 20 entries per page
                <br/>Page: {"curPage" in props.Data ? props.Data["curPage"] : "1"}/{"totPage" in props.Data ? props.Data["totPage"] : "1"}</label>
                <label style={{fontSize:"20px"}}>{props.tbName}</label>
                <div className="navTable">
                    <div className="navPrv navStl" onClick={props.handlNavPrv}><i className="fa fa-caret-left"></i></div>
                    <div className="navNxt navStl" onClick={props.handlNavNxt}><i className="fa fa-caret-right"></i></div>
                    <div className="navStl" onClick={props.hndlDown}><i className="fa fa-download"></i></div>
                    <RepUp 
                    icon="fa fa-upload"
                    wdLabl="DISB"
                    onChange={props.disOnChange}
                    />
                    <RepUp 
                    icon="fa fa-upload"
                    wdLabl="EFX"
                    onChange={props.eqOnChange}
                />  
                </div>
            </div>
            <div className={show}>
                <table>
                    <thead>
                        <tr>
                            {"clName" in props.Data && props.Data["clName"].map(val => {
                                return (
                                    <th>{val}</th>
                                );
                            })}
                            {("clName" in props.Data) && (props.tbName === "Master Repayment Schedule") && (<th>Display</th>)}
                        </tr>
                    </thead>
                    <tbody>
                            {"data" in props.Data && props.Data["data"].map(row => {
                                return(
                                    <tr>
                                    {row.map(val => {
                                        return (
                                            <td>{val}</td>
                                        );
                                    })}
                                    {(props.tbName === "Master Repayment Schedule") && (row[0].length > 2) && (<td><button style={btstl} name={row[0]} onClick={props.hndlViewMore} color="primary">VIEW MORE</button></td>)}
                                    {(props.tbName === "Master Repayment Schedule") && (row[0].length <= 2) && (<td></td>)}
                                    </tr>
                                    );                            
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DtTable;