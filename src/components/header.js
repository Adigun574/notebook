import React, { useState } from 'react';
import '../css/header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock, faStickyNote } from '../../node_modules/@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";




function Header() {

    const history = useHistory()    
    const [isOpen, setIsOpen] = useState(false)

    const menuClass = `dropdown-menu${isOpen ? " show" : ""}`;

    
    const toggleOpen = () => setIsOpen(!isOpen) ;

    const logout = () => {
        history.push('/')
    }

    
    return (
        <div>
            <div className="header-body d-flex">
                    <h3 className="pl-2"><FontAwesomeIcon icon={faStickyNote} /> <b>MiNotes</b></h3>
                <div className="dropdown pr-4" onClick={toggleOpen} >
                    <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    >
                    <FontAwesomeIcon icon={faUserLock} />
                    </button>
                    <div className={menuClass} aria-labelledby="dropdownMenuButton">
                    <span className="dropdown-item">
                        Settings
                    </span>
                    <span className="dropdown-item" onClick={logout}>
                        Logout
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
