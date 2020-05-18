export default (state, action) => {
    switch (action.type) {
        case 'ATTEMPT_LOGIN':
            return {
                ...state,
                isLoggingIn: true
            }
        case 'LOGIN':
            return{
                ...state,
                user: action.payload.user,
                isLoggingIn: false,
            }
        
        case 'FAILED_LOGIN':
            return {
                ...state,
                user: {},
                isLoggingIn: false
            }
        default:
            return state;
    }
}