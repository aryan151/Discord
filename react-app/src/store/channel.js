const LOAD_CHANNELS = 'channels/GET_CHANNELS'
const LOAD_ONE_CHANNEL = 'channels/LOAD_ONE_CHANNEL'

const getChannelsForServer = (channels) => ({
  type: LOAD_CHANNELS,
  channels
})

const addOneChannel = (channel) => ({
  type: LOAD_ONE_CHANNEL,
  channel
})



export const fetchChannels = (serverId) =>  async (dispatch) => {
  if(!serverId) return
  const channels = await fetch(`/api/channels/${serverId}`)
  const data = await channels.json();
    console.log(data)
    dispatch(getChannelsForServer(data))
}

export const addChannel = (payload) => async dispatch => {
  const response = await fetch('/api/channels/', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json',
    },
    body: JSON.stringify({ ...payload})
  })

    if (response.ok) {
        const channel = await response.json()
        dispatch(addOneChannel(channel))
    }
  }

  const initialState = {}

  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_CHANNELS:
        const newState = {...state}
        const serverId = Object.keys(action.channels)[0]
        newState[serverId] = action.channels[serverId]

        return newState

      case LOAD_ONE_CHANNEL: {
        const newState = {
            ...state,
            [action.channel['id']]: action.channel
        }
        return newState
      }

      default:
        return state;
    }
  }
