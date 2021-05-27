import React from 'react';
import { createPortal } from 'react-dom';

function RepUpload(props) {
    let ipBtn;

    const handleClick = (e) => {
        ipBtn.click();
    }
    let stl = {
        backgroundColor : "black",
        width:"200px",
        margin:"20px",
        padding:"5px",
        borderRadius:"10px",
        cursor:"pointer",
        userSelect:"none",
        fontSize:"18px",
        color:"#fff",
        fontFamily:"'Courier New', Courier, monospace",
        display: "inline-block",
        textAlign: "center"
    };
    let istl = {
        display : "block",
        width: "100%",
        marginBottom:"5px"
    }
    return (
        <div onClick={handleClick} style={stl} className="dashFlBtn">
                <i style={istl} className={props.icon}></i>
                 {props.wdLabl}
                 <input
                  hidden
                  id="fileUpload" 
                  type="file"
                  onChange={props.onChange}
                  ref={el => (ipBtn = el)}
                  />
        </div>
    );
}

export default RepUpload;