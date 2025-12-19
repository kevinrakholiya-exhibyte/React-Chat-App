export const initialState = {
    message: [],
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
        default:
            return state
    }
}

export default chatReducer;
