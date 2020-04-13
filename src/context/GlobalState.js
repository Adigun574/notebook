import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios'
import api from '../config/config';

//Initial state
const initialState  = {
    notes:[
            // {
            //     _id:1,
            //     title:'How to do stuffs',
            //     note:'How to do stuffs. Lorem ipsum dolor ameit. ',
            //     date:'22/05/19',
            //     email:'adigun@gmail.com'
            // },
            // {
            //     _id:2,
            //     title:'How to make eba',
            //     note:'How to make eba. Lorem ipsum dolor ameit',
            //     date:'25/06/19',
            //     email:'adigun@gmail.com'
            // },
            // {
            //     _id:3,
            //     title:'How to dig a hole',
            //     note:'How to dig a hole. Lorem ipsum dolor ameit',
            //     date:'30/07/19',
            //     email:'adigun@gmail.com'
            // },
            // {
            //     _id:4,
            //     title:'How repair a car',
            //     note:'How to repair a car. Lorem ipsum dolor ameit',
            //     date:'04/08/19',
            //     email:'adigun@gmail.com'
            // }
        ],
    user:{
        id:1,
        name:'Adigun Ibrahim',
        email:'adigun@gmail.com'
    },
    user2:null,
    selectedNote:null
}

//Create context
export const GlobalContext = createContext(initialState)

//Provider component
export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(AppReducer, initialState)

    const getAllNotes = (notes) => {
        // axios.get(`${api}notes/getnotesbyuseremail/${email}`)
        //     .then(res=>{
        //         dispatch({
        //             type:'GET_ALL_NOTES',
        //             payload:res.data.message
        //         })
        //     })
        //     .catch(err=>{
        //         dispatch({
        //             type:'GET_ALL_NOTES',
        //             payload:[]
        //         })
        //     })
        dispatch({
            type:'GET_ALL_NOTES',
            payload:notes
        })
    }

    const getSingleNote = (id) => {
        dispatch({
            type:'GET_SINGLE_NOTE',
            payload:id
        })
    }

    const deleteNote = (id) => {
        axios.delete(`${api}notes/deletesinglenote/${id}`)
            .then(result=>{
                dispatch({
                    type:'DELETE_SINGLE_NOTE',
                    payload:id
                })
            })
            .catch(err=>{

            })
    }

    const deleteAllNotesByEmail = (email) => {
        axios.delete(`${api}notes/deleteallnotes/${email}`)
            .then(result=>{
                dispatch({
                    type:'DELETE_ALL_NOTES',
                    payload:email
                })
            })
            .catch(err=>{

            })
    }

    const saveNote = (note) => {
        axios.post(`${api}notes/savenote`,note)
            .then(result=>{
                note._id = result.data.data._id
                dispatch({
                    type:'GET_ALL_USERS_NOTE_AFTER_SAVING',
                    payload:note
                })
            })
            .catch(err=>{

            })
    }

    const updateNote = (note) => {
        axios.put(`${api}notes/updatenote`,note)
            .then(result=>{
                dispatch({
                    type:'UPDATE_NOTE',
                    payload:note
                })
            })
            .catch(err=>{
                
            })
    }

    const registerUser = (userObj) => {
        axios.post(`${api}users/register`,userObj)
            .then(result=>{
                // console.log(result)
                dispatch({
                    type:'REGISTER_USER',
                    payload:userObj
                })
            })
            .catch(err=>{

            })
    }

    const authenticateUser = (userObj) => {
        // axios.post(`${api}users/authenticate`,userObj)
        //     .then(result=>{
        //         console.log(result)
        //         dispatch({
        //             type:'AUTHENTICATE_USER',
        //             payload:userObj
        //         })
        //     })
        //     .catch(err=>{

        //     })
        // return axios.post(`${api}users/authenticate`,userObj)
            // .then(result=>{
            //     console.log(result)
            //     dispatch({
            //         type:'AUTHENTICATE_USER',
            //         payload:userObj
            //     })
            // })
            // .catch(err=>{

            // })
            // console.log(userObj)
            dispatch({
                type:'AUTHENTICATE_USER',
                payload:userObj
            })
    }


    return <GlobalContext.Provider value={{
                notes:state.notes,
                user:state.user,
                user2:state.user2,
                selectedNote:state.selectedNote,
                getSingleNote,
                deleteNote,
                deleteAllNotesByEmail,
                getAllNotes,
                updateNote,
                saveNote,
                registerUser,
                authenticateUser
            }}
        >
            {children}
        </GlobalContext.Provider>

}
