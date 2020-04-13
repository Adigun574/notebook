import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext, GlobalProvider } from '../context/GlobalState';
import '../css/login.css';
import { Link, useHistory } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from '../config/config';
import axios from 'axios';


function Login() {

    const context = useContext(GlobalContext)
    const { authenticateUser } = useContext(GlobalContext) 

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [wrongCredentials, setWrongCredentials] = useState(false)
    const [emptyCredentials, setEmptyCredentials] = useState(false)


    const history = useHistory()

    const handleEmailChange = (e) => {
        setEmail(e)
    }

    const handlePasswordChange = (e) => {
        setPassword(e)
    }

    const handleLoginUser = () => {
        setEmptyCredentials(false)
        setWrongCredentials(false)
        if(!email || !password){
            //LOGIC TO HANDLE INVALID FIELDS
            setEmptyCredentials(true)
        }
        else{
            setLoading(true)
            setWrongCredentials(false)
            let userObj = {
                email,
                password
            }
            axios.post(`${api}users/authenticate`,userObj)
                .then(result=>{
                    // authenticateUser(userObj)
                    delete userObj.password
                    localStorage.setItem("minoteUser",JSON.stringify(userObj))
                    history.push('/notes')
                })
                .catch(err=>{
                    setWrongCredentials(true)
                    setLoading(false)
                })

        }        
    }


  return (
    <GlobalProvider>
      <div className="login-body">
        <div className="container">
            <div className="login-div">
                <div className="login-title">MiNotes</div>
                <div className="logo"></div>
                {
                    wrongCredentials? 
                        <div className="text-center wrong-cred">
                            <small className="text-danger text-center"><b>Wrong Login Credentials</b></small>
                        </div>:
                        null
                }
                {
                    emptyCredentials? 
                        <div className="text-center wrong-cred">
                            <small className="text-danger text-center"><b>Invalid Login Credentials</b></small>
                        </div>:
                        null
                }
                <div className="fields">
                    <div className="username d-flex"><svg fill="#999" viewBox="0 0 1024 1024"><path className="path1" d="M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z"></path></svg>
                        <input type="username" className="user-input" placeholder="email" 
                            onInput={(e)=>{handleEmailChange(e.target.value)}}/>
                    </div>
                    <div className="password d-flex"><svg fill="#999" viewBox="0 0 1024 1024"><path className="path1" d="M742.4 409.6h-25.6v-76.8c0-127.043-103.357-230.4-230.4-230.4s-230.4 103.357-230.4 230.4v76.8h-25.6c-42.347 0-76.8 34.453-76.8 76.8v409.6c0 42.347 34.453 76.8 76.8 76.8h512c42.347 0 76.8-34.453 76.8-76.8v-409.6c0-42.347-34.453-76.8-76.8-76.8zM307.2 332.8c0-98.811 80.389-179.2 179.2-179.2s179.2 80.389 179.2 179.2v76.8h-358.4v-76.8zM768 896c0 14.115-11.485 25.6-25.6 25.6h-512c-14.115 0-25.6-11.485-25.6-25.6v-409.6c0-14.115 11.485-25.6 25.6-25.6h512c14.115 0 25.6 11.485 25.6 25.6v409.6z"></path></svg>
                        <input type="password" className="pass-input" placeholder="password" 
                            onInput={(e)=>{handlePasswordChange(e.target.value)}}/>
                    </div>
                </div>
                <button className="signin-button" onClick={handleLoginUser}>
                    {loading?
                    <div className="spinner-border mr-2">
                        <span className="sr-only">Loading...</span>
                    </div>:
                    null}
                    Login <FontAwesomeIcon icon={faUserCircle} />
                </button>
                <div className="link">
                <a href="#a">Forgot password?</a> or <Link to="/signup"><span className="signup-link">Sign up</span></Link>
                </div>
                {/* <button onClick={test}>test</button>  */}
            </div>
        </div> 
      </div>
    </GlobalProvider>
  );
}

export default Login;
