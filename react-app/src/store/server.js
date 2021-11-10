const LOAD = 'spots/LOAD'
const ADD_SERVER = 'spots/ADD_SERVER'
const LOAD_MY_SERVERS = 'spots/LOAD_MY_SERVERS'


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


//THUNK ACTION GETTING ALL SERVERS

export const getServers = () => async dispatch => {
    const response = await fetch('/api/servers/')
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
    }
}

export const getMyServers = (userId) => async dispatch => {
    const response = await fetch(`/api/servers/${userId}`)
    if (response.ok) {
        const servers = await response.json()
        dispatch(loadServers(servers))
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
                ...state,
                // list: action.list.servers,
            }
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
