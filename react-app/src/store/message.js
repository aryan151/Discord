const LOAD = 'messages/LOAD'
const ADD_ONE_MESSAGE = 'messages/ADD_ONE_MESSAGE'
const UPDATE_ONE_MESSAGE = 'messages/UPDATE_ONE_MESSAGE'
const REMOVE_ONE_MESSAGE = 'messages/REMOVE_ONE_MESSAGE'



const load = messages => ({
    type: LOAD,
    messages
})

const addMessage = message => ({
    type: ADD_ONE_MESSAGE,
    message
})

const updateOneMessage = message => ({
    type: UPDATE_ONE_MESSAGE,
    message
})

const removeMessage = message => ({
    type: REMOVE_ONE_MESSAGE,
    message,
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

export const updateMessage = (payload, messageId) => async dispatch => {
    const response = await fetch(`/api/messages/edit/${messageId}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ ...payload})
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(updateOneMessage(message))
    }

}

export const deleteOneMessage = (messageId) => async dispatch => {
    const response = await fetch (`/api/messages/delete/${messageId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const message = await response.json()
        dispatch(removeMessage(message))
    }
}


const initialState = {}

const messagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allMessages = {};

            if(action.messages.messages.length > 0) {

                const channelId = action.messages.messages[0].channelId
                allMessages[channelId] = action.messages.messages
            }
            return {
                ...allMessages,
                ...state,
            }
        }
        case UPDATE_ONE_MESSAGE: {
            const oldMessages = {...state}
            const oldMessage = oldMessages[action.message.channelId].find((message) => message.id === action.message.id)
            const index = oldMessages[action.message.channelId].indexOf(oldMessage)
            oldMessages[action.message.channelId][index] = action.message
            return oldMessages

        }
        case REMOVE_ONE_MESSAGE: {
            const oldMessages = {...state}
            // const oldMessage = oldMessages[action.message.channelId].find((message) => message.id === action.message.messageId)
            // let index = oldMessages[action.message.channelId].indexOf(oldMessage)
            // oldMessages[action.message.channelId].splice(index, 1)
            // return oldMessages
            oldMessages[action.message.channelId].map((message, i) => {
                if (message.id === action.message.messageId) {
                    oldMessages[action.message.channelId].splice(i, 1)
                }
            })
            return oldMessages;

        }
        case ADD_ONE_MESSAGE: {
            // let channelId = action.message.channelId
            const newState = {
                ...state,
            }
            // newState[action.message['channelId']] ? newState[action.message['channelId']] = [action.message, ...newState[action.message.channelId]] : action.message.channelId = [action.message]
            // newState[action.message['channelId']] = [action.message]
            return newState

        }
        default:
        return state;
    }
}

export default messagesReducer
