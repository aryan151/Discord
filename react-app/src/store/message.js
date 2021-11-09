const LOAD = 'messages/LOAD'


const load = messages => ({
    type: LOAD,
    messages
})

export const getMessages = (channelId) => async dispatch => {
    const response = await fetch(`/api/messages/${channelId}`)
    if (response.ok) {
        const list = await response.json()

        dispatch(load(list))
    }
}

const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allMessages = {};
            let channelId = action.messages.messages[0].channelId
            allMessages[channelId] = action.messages.messages
            return {
                ...allMessages,
                ...state,
            }
        }
        default:
        return state;
    }
}

export default messagesReducer
