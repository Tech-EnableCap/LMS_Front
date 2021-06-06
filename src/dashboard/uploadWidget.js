import React from 'react';

function RepUpload(props) {
    let ipBtn;

    const handleClick = (e) => {
        ipBtn.click();
    }
    let stl = {
        width:"auto",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize:"18px",
        padding: "1px 3px 0 3px"
    };
    let istl = {
        margin:"8px 2px 0px 0"
    }
    return (
        <div onClick={handleClick} style={stl} className="dashFlBtn navStl">
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