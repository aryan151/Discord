const LOAD = 'messages/LOAD'
const ADD_ONE_MESSAGE = 'messages/ADD_ONE_MESSAGE'


const load = messages => ({
    type: LOAD,
    messages
})

const addMessage = message => ({
    type: ADD_ONE_MESSAGE,
    message
})

export const getMessages = (channelId) => async dispatch => {
    const response = await fetch(`/api/messages/${channelId}`)
    if (response.ok) {
        const list = await response.json()

        dispatch(load(list))
    }
}

export const createOneMessage = (payload, channelId) => async dispatch => {
    const response = await fetch(`/api/messages/${channelId}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ ...payload})
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(addMessage(message))
    }
}

const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allMessages = {};

            if(action.messages.messages.length > 0) {

                let channelId = action.messages.messages[0].channelId
                allMessages[channelId] = action.messages.messages
            }
            return {
                ...allMessages,
                ...state,
            }
        }
        case ADD_ONE_MESSAGE: {
            // let channelId = action.message.channelId
            const newState = {
                ...state,
            }
            newState[action.message['channelId']] ? newState[action.message.channelId].push(action.message) : action.message.channelId = [action.message]
            return newState
        }
        default:
        return state;
    }
}

export default messagesReducer
