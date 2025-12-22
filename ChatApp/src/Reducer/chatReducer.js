export const initialState = {
    message: [],
    users: []
}

const chatReducer = (state, action) => {
    switch (action.type) {
        case "EDIT_MESSAGE":
            return {
                ...state,
                message: state.message.map(msg =>
                    msg.id === action.payload.id ? { ...msg, text: action.payload.text, edited: true } : msg
                )
            }
        case "DELETE_MESSAGE":
            return {
                ...state,
                message: state.message.filter(
                    msg => msg.id !== action.payload
                )
            }
        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? { ...user, ...action.payload.data } : user)
            }
        default:
            return state
    }
}

export default chatReducer;
