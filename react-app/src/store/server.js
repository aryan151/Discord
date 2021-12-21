const LOAD = 'spots/LOAD'
const ADD_SERVER = 'spots/ADD_SERVER'
const LOAD_MY_SERVERS = 'spots/LOAD_MY_SERVERS'
const LOAD_EDIT_SERVER = 'spots/LOAD_EDIT_SERVER'
const LOAD_AFTER_DELETE = 'spots/LOAD_AFTER_DELETE'
const ADD_MY_SERVER = 'spots/ADD_MY_SERVER'
const LOAD_All_AFTER_DELETE = 'spots/LOAD_All_AFTER_DELETE'
// const EDIT_SERVER = 'spots/EDIT_SERVER'


//LOAD ALL SERVERS

const load = list => ({
    type: LOAD,
    list
})

const addOneServer = server => ({
    type: ADD_SERVER,
    server
})

const loadServers = servers => ({
    type: LOAD_MY_SERVERS,
    servers
})

const addEditServer = server => ({
    type: LOAD_EDIT_SERVER,
    server
})

const loadAfterDelete = id => ({
    type: LOAD_AFTER_DELETE,
    id
})
const loadAllAfterDelete = id => ({
    type: LOAD_All_AFTER_DELETE,
    id
})

const addOneMyServer = server => ({
    type: ADD_MY_SERVER,
    server
})

// const editOneServer = edit_server => ({
//     type: EDIT_SERVER,
//     edit_server
// })


//THUNK ACTION GETTING ALL SERVERS

export const getServers = (userId) => async dispatch => {
    const response = await fetch(`/api/servers/explore/${userId}`)
    if (response.ok) {
        const list = await response.json()

        dispatch(load(list))
    }
}

export const addServer = (payload) => async dispatch => {
    const response = await fetch('/api/servers/', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ ...payload})
    })

    if (response.ok) {
        const server = await response.json()
        dispatch(addOneServer(server))
        dispatch(addOneMyServer(server))
    }
}


export const getMyServers = (userId) => async dispatch => {
    const response = await fetch(`/api/servers/${userId}`)
    if (response.ok) {
        const servers = await response.json()
        dispatch(loadServers(servers))
    }
}

export const editOneServer = (payload, serverId) => async dispatch =>{
    const response = await fetch(`/api/servers/${serverId}`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
    })

    if (response.ok) {
        const server = await response.json()
        dispatch(addEditServer(server))
    }
}

export const deleteOneServer = (serverId) => async dispatch => {
    const response = await fetch(`/api/servers/delete/${serverId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
        },

    })
        if (response.ok) {
            const { id } = await response.json()
            dispatch(loadAfterDelete(id))
            dispatch(loadAllAfterDelete(id))
        }
}


export const removeOneServer = (serverId, userId) => async dispatch => {
    const response = await fetch(`/api/servers/remove/${serverId}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
        },

    })
        if (response.ok) {
            const { id } = await response.json()
            dispatch(loadAfterDelete(id))
        }
}




const initialState = {
    // list: []
}

export const myServersReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOAD_MY_SERVERS: {
            const allServers = {};
             action.servers.servers.forEach(server => {
                allServers[server.id] = server
            });

            return {
                ...allServers,
                ...state,
                // list: action.list.servers,
            }
        }
        case LOAD_AFTER_DELETE: {
            const newState = {...state}
            delete newState[action.id]
            return newState;
        }
        case LOAD_EDIT_SERVER: {
            const newState = { ...state }
            delete newState[action.server.id]
            newState[action.server.id] = action.server
            return newState;
        }
        case ADD_MY_SERVER: {
            const newState = {
                ...state,
                [action.server['id']]: action.server
            }
            return newState
        }
        default:
        return state;
    }
}


const serversReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allServers = {};
            action.list.servers.forEach(server => {
                allServers[server.id] = server
            });
            return {
                ...allServers,
                // ...state,
                // list: action.list.servers,
            }
        }
        case LOAD_All_AFTER_DELETE: {
            const newState = {...state}
            delete newState[action.id]
            return newState;
        }

        case ADD_SERVER: {
            const newState = {
                ...state,
                [action.server['id']]: action.server
            }
            return newState
        }
        default:
        return state;
    }
}

export default serversReducer
