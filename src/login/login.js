import './login.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {route} from '../route'

function Login(props) {
    const [ipVal, setVal] = useState({
        email:"",
        pass:""
    });

    const hndlEmail = (e) => {
        setVal({
            ...ipVal,
            email:e.target.value
        });
    }

    const hndlPass = (e) => {
        setVal({
            ...ipVal,
            pass:e.target.value
        });
    }

    const sendCred = () => {
        if(typeof(Storage) === "undefined") {
            alert("LocalStorage not available, some plugins might be blocking it, try uninstalling them, or switch to different browser.");
            return;
        }

        if(ipVal.email === "" || ipVal.pass === "" ) {
            alert("Email and password should not be empty");
            return;
        }

        props.isLoad(true);
        let config = ipVal;
        axios.post(route + "/login", config)
            .then(res => {
                if(!("token" in res.data.msg)) {
                    alert("Unable to login, please check your email id and password");
                    props.isLoad(false);
                    return;
                }
                console.log(res.data.msg);
                console.log(config);
                    
                localStorage.enalmsjwttkn = res.data.msg.token;
                props.hndlLogIn();
                props.isLoad(false);
            })
            .catch(err => {
                alert("Unable to connect to server.");
                console.log(err);
                props.isLoad(false);
            });
    }

    return (
        <section className="log_cnv">
            <div className="logCard">
                <div className="topSec">
                    <img src="https://img.icons8.com/nolan/256/lock.png" className="lock"/>
                    <div className="ip">
                        <img src="https://img.icons8.com/nolan/64/user.png"/>
                        <input value={ipVal.email} onChange={hndlEmail} type="text" placeholder="Email ID" />
                    </div>
                    <div className="ip">
                        <img src="https://img.icons8.com/nolan/64/password.png"/>
                        <input value={ipVal.pass} onChange={hndlPass} type="password" placeholder="Password"/>
                    </div>
                    <button onClick={sendCred}>LOGIN</button>
                </div>
                <div className="bottomSec"></div>
            </div>
        </section>
    );
}

export default Login;