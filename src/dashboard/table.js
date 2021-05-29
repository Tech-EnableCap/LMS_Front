function DtTable(props) {
    //let show = (props.show ? "dtTab" : "dtTab hide");
    const show = "dtTab";
    return (
        <div className="table">
            <div className="tbHeader">
                <label>0 entries found | Showing 20 entries per page</label>
                <label style={{fontSize:"20px"}}>{props.tbName}</label>
                <div className="navTable">
                    <div className="navPrv navStl" onClick={props.handlNavPrv}><i className="fa fa-caret-left"></i></div>
                    <div className="navNxt navStl" onClick={props.handlNavNxt}><i className="fa fa-caret-right"></i></div>
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
                        </tr>
                    </thead>
                    <tbody>
                            {"data" in props.Data && props.Data["data"].map(row => {
                                return(
                                    <tr>
                                    {row.map(val => {
                                        //console.log(val);
                                        return (
                                            <td>{val}</td>
                                        );
                                    })}</tr>
                                    );                            
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DtTable;