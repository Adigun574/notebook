import React, { useContext, useEffect, useState } from 'react';
import '../css/sidebar.css';
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStickyNote, faSearch } from '../../node_modules/@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import api from '../config/config';


function Sidebar() {
    const context = useContext(GlobalContext)
    // const { getSingleNote, deleteNote, deleteAllNotesByEmail, getAllNotes } = useContext(GlobalContext) 
    const { getSingleNote, deleteNote, getAllNotes } = useContext(GlobalContext) 
    const [searcKey, setSearchKey] = useState('')
    let filteredNotes = context.notes

    const currentUser = JSON.parse(localStorage.getItem("minoteUser"))

    const getAllUsersNote = () => {
        axios.get(`${api}notes/getnotesbyuseremail/${currentUser.email}`)
            .then(result=>{
                getAllNotes(result.data.message)
            })
            .catch(err=>{

            })
    }


    const getNote = (note)=>{
        getSingleNote(note._id)
    }

    const deleteSingleNote = (id) => {
        deleteNote(id)
    }

    // const deleteAllNotes = () => {
    //     deleteAllNotesByEmail(context.user.email)
    // }

    const handleSearch = (e) => {
        setSearchKey(e)
        filteredNotes = context.notes.filter(x=>x.title.includes(e))
        console.log(filteredNotes)
    }

    
    useEffect(()=>{
        // getAllNotes(context.user.email)
        getAllUsersNote()
    },[])
    

    return (
        <div>
            <div className="sidebar-body">
                <div className="sticky-searchbar">
                    <h5><b className="notes"><FontAwesomeIcon icon={faStickyNote} /> Notes</b></h5>
                    <div className="input-group">
                    <input type="search" className="form-control" onInput={(e)=>handleSearch(e.target.value)}/>
                    <div className="input-group-append">
                        <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                    </div>
                    </div>
                </div>
                <hr/>
                <div className="d-none">
                    <h5 className="text-muted">You have not added any note!!!</h5>
                </div>
                <div>
                    <ul>
                        {context.notes.map(note=>{
                        {/* {filteredNotes.map(note=>{ */}
                            return <li key={note._id} className="note-title">
                                    <div className="d-flex">
                                        <button onClick={()=>deleteSingleNote(note._id)} className="btn mr-2">
                                            <FontAwesomeIcon icon={faTrash} className="button-delete"/>
                                        </button>
                                        <div onClick={()=>getNote(note)} className="item" title={note.title}>
                                            {
                                                note.title.length>20 ? 
                                                    <span className="title">{note.title.slice(0,20)}...<br/></span>:
                                                    <span className="title">{note.title}<br/></span>
                                            }
                                            {
                                                note.note.length>10 ? 
                                                    <span><small>{note.note.slice(0,20)}...</small><br/></span>:
                                                    <span><small>{note.note}</small><br/></span>
                                            }
                                            <span className="date"><small><b>{note.date}</b></small></span>
                                        </div>
                                    </div>
                                    <hr/>
                                </li>
                        })}
                    </ul>
                    {/* <button className="btn btn-danger delete-btn" onClick={deleteAllNotes}> 
                        <FontAwesomeIcon icon={faTrash}/> Delete All Notes
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
