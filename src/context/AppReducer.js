export default (state, action) => {
    switch(action.type){
        case 'GET_ALL_NOTES':
            return{
                ...state,
                notes:action.payload
            }
        case 'GET_SINGLE_NOTE':
            return{
                ...state,
                selectedNote:state.notes.find(x=>x._id === action.payload)
            }
        case 'DELETE_SINGLE_NOTE':
            return{
                ...state,
                notes:state.notes.filter(x=>x._id !== action.payload)
            }
        case 'DELETE_ALL_NOTES':
            return{
                ...state,
                notes:[]
            }
        case 'UPDATE_NOTE':
            let noteToUpdate = state.notes.find(x=>x._id === action.payload._id)
            let index = state.notes.indexOf(noteToUpdate)
            state.notes.splice(index,1)
            noteToUpdate = action.payload
            return{
                ...state,
                notes:[noteToUpdate,...state.notes]
            }
        case 'GET_ALL_USERS_NOTE_AFTER_SAVING':
            return {
                ...state,
                notes:[...state.notes,action.payload]
            }
        case 'REGISTER_USER':
            delete action.payload.password
            return{
                ...state,
                user:action.payload
            }
        case 'AUTHENTICATE_USER':
            return{
                ...state,
                user2:action.payload
            }
        default:
            return state
    }
}