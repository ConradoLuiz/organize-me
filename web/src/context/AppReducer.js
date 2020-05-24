export default (state, action) => {
    switch (action.type) {
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
                user: action.payload.user,
                isLoggedIn: true,
                isLoggingIn: false,
                isSigningUp: false,
            }
        
        case 'FAILED_LOGIN':
            return {
                ...state,
                user: {},
                isLoggingIn: false,
                hasLoginError: true
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
        default:
            return state;
    }
}