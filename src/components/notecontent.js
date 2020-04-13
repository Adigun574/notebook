import React, {useContext, useState, useEffect} from 'react';
import '../css/notecontent.css';
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusCircle, faUpload } from '../../node_modules/@fortawesome/free-solid-svg-icons';



function Notecontent() {
    const context = useContext(GlobalContext)
    const { saveNote, updateNote, authenticateUser } = useContext(GlobalContext)
    let selectedNoteContent = {...context.selectedNote}
    const [text, setText] = useState(selectedNoteContent.note?selectedNoteContent.note:'')
    const [title, setTitle] = useState(selectedNoteContent.title?selectedNoteContent.title:'')
    const currentUser = JSON.parse(localStorage.getItem("minoteUser"))


    

    const handleTitleChange = (value) => {
        setTitle(value)
    }
    

    const handleTextChange = (value) => {
        setText(value)
    }

    const saveChanges = () => {
        selectedNoteContent = {...selectedNoteContent, note:text, title:title, email:currentUser.email}
        delete selectedNoteContent._id
        saveNote(selectedNoteContent)
    }

    const updateChanges = () => {
        selectedNoteContent = {...selectedNoteContent, note:text, title:title}
        updateNote(selectedNoteContent)
    }

    const newNote = () => {
        selectedNoteContent = {
            id:null,
            title:'',
            note:'',
            date:'',
            email:''
        }
        setText('')
        setTitle('')
    }

    useEffect(() => {
        setText(context.selectedNote?context.selectedNote.note:'')
        setTitle(context.selectedNote?context.selectedNote.title:'')
    },[context]);
    

    return (
        <div className="all">
            <div className="p-4">
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input type="text"
                        value={title}
                        onChange={(e)=>handleTitleChange(e.target.value)}
                        className="form-control title-text"
                    />
                </div>
                <div className="notecontent-body">
                    <div className="form-group">
                        <textarea 
                            value={text}
                            onChange={(e)=>handleTextChange(e.target.value)}
                            className="form-control"
                            // cols="80"
                            rows="15"
                        ></textarea>
                    </div>
                    
                    <div className="btn-group buttons">
                        <button className="btn btn-success mr-2" onClick={saveChanges}>
                            <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                        <button className="btn btn-info mr-2" onClick={updateChanges}>
                            <FontAwesomeIcon icon={faUpload} /> Update
                        </button>
                        <button className="btn btn-primary" onClick={newNote}>
                            <FontAwesomeIcon icon={faPlusCircle} /> New
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notecontent
