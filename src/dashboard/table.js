function DtTable(props) {
   
    return (
        <div className="table">
            <div className="tbHeader">
                <label>{props.Data ? props.Data["data"].length : "0"} entries found | Showing 20 entries per page</label>
                <label style={{fontSize:"20px"}}>{props.tbName}</label>
                <div className="navTable">
                    <div className="navPrv navStl" onClick={props.handlNavPrv}><i className="fa fa-caret-left"></i></div>
                    <div className="navNxt navStl" onClick={props.handlNavNxt}><i className="fa fa-caret-right"></i></div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {props.Data && props.Data["clName"].map(val => {
                            return (
                                <th>{val}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                        {props.Data && props.Data["data"].map(row => {
                            return(
                                <tr>
                                {row.map(val => {
                                    return (
                                        <td>{val}</td>
                                    );
                                })}</tr>
                                );                            
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default DtTable;