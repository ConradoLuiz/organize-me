export default (state, action) => {
    switch (action.type) {
        case 'RESET_GLOBAL_CACHED_STATE':
            return {
                ...state,
                ...action.payload,
                isLoggedIn: false,
                user: {}
            }
        case 'SET_USER':
            return{
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        case 'RESET_LOGIN':
            return {
                ...state,
                hasLoginError: true,
                isLoggingIn: false,
                user: {}
            }
        case 'ATTEMPT_LOGIN':
            return {
                ...state,
                isLoggingIn: true,
                hasLoginError: false
            }
        case 'LOGIN':
            return{
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isLoggingIn: false,
                isSigningUp: false,
            }
        
        case 'FAILED_LOGIN':
            return {
                ...state,
                user: {},
                isLoggingIn: false,
                hasLoginError: true,
                isLoggedIn: false
            }

        case 'ATTEMPT_SIGNUP':
            return {
                ...state,
                isSigningUp: true,

            }
        
        case 'FAILED_SIGNUP':
            return {
                ...state,
                user: {},
                isSigningUp: false,
                signupError: action.payload
            }
        
        case 'RESET_SIGNUP':
            return {
                ...state,
                user: {},
                isSigningUp: false,
                signupError: null
            }
        
        case 'OPEN_MODAL':
            return {
                ...state,
                isModalOpen: true
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                isModalOpen: false
            }
        
        case 'ATTEMPT_CREATE_NOTE':
            return {
                ...state,
                isCreatingNote: true
            }

        case 'CREATE_NOTE':
            return {
                ...state,
                isCreatingNote: false,
                notes: [action.payload , ...state.notes]
            }
        
        case 'LOADING_NOTES':
            return {
                ...state,
                isLoadingNotes: true
            }
        
        case 'LOADED_NOTES':
            return {
                ...state,
                isLoadingNotes: false,
                notes: action.payload
            }
        
        case 'DELETE_NOTE':
            return{
                ...state,
                notes: state.notes.filter(note => note.id != action.payload)
            }
        case 'SET_MAIN_NOTE':
            return{
                ...state,
                mainNote: action.payload
            }

        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: [ action.payload , ...state.notes.filter(note => note.id != action.payload.id) ]
            }

        case 'SAVE_NOTE':
            return {
                ...state,
                notes: [ ...state.notes.map(note => (note.id == action.payload.id) ? action.payload : note) ]
            }
        default:
            return state;
    }
}