const ADD_ONE_DM = 'dms/ADD_ONE_DM'
const LOAD_ALL = '/dms/LOAD'

const addDm = (message, userId) => ({
  type: ADD_ONE_DM,
  message,
  userId
})

const loadDms = (messages, userId) => ({
  type: LOAD_ALL,
  messages,
  userId
})

export const fetchDms = (userId) => async dispatch => {
  const res = await fetch(`/api/dms/${userId}`)
  if (res.ok){
    const messages = await res.json()
    dispatch(loadDms(messages['dms'], userId))
  }
}

export const createDm = (message) => async dispatch => {
  const response = await fetch('/api/dms/new', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json',
    },
    body: JSON.stringify({...message})
  })
  if (response.ok) {
    const message = await response.json()
    dispatch(addDm(message))
  }

}


const initialState = {}
const dmMessagesReducer = (state = initialState, action) => {
    switch(action.type) {
      case(LOAD_ALL):
        const prev = {...initialState }
        // const dms = action.messages;
        action.messages.map(dm => {
          let key = dm.dm_server_Id == action.userId ? dm.senderId : dm.dm_server_Id;
          prev[key] = prev[key] ? [...prev[key], dm] : [dm]})
          //   if (prev[dm.dm_server_Id]){
          //   prev[dm.dm_server_Id] = [...prev[dm.dm_server_Id], dm]
          // }
          // else  prev[dm.dm_server_Id] = dm;
          // })
        return prev;
      case(ADD_ONE_DM):
        return state
      default:
        return state;
      }
    }

export default dmMessagesReducer
