const LOAD_CHANNELS = 'channels/GET_CHANNELS'
const LOAD_ONE_CHANNEL = 'channels/LOAD_ONE_CHANNEL'
const DELETE_ONE = 'channels/DELETE_ONE'


const getChannelsForServer = (channels) => ({
  type: LOAD_CHANNELS,
  channels
})

const addOneChannel = (channel) => ({
  type: LOAD_ONE_CHANNEL,
  channel
})


const deleteOneChannel = (channelId, serverId) => ({
  type: DELETE_ONE,
  channelId,
  serverId
})

export const fetchChannels = (serverId) =>  async (dispatch) => {
  if(!serverId) return
  const channels = await fetch(`/api/channels/${serverId}`)
  const data = await channels.json();
    // console.log(data)
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

  export const deleteChannel = (id) => async dispatch => {
    const res = await fetch(`/api/channels/delete/${id}`, {
      method: 'DELETE'
    })
      if (res.ok) {
      const {channelId, serverId} = await res.json()
      dispatch(deleteOneChannel(channelId, serverId))
      return null;
      }
      else return ['An Error has occured']
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
            ...state
        }
        const serverId = action.channel.serverId;
        newState[serverId] ? newState[serverId] = [...newState[serverId], action.channel] :  newState[serverId] = [action.channel]

        return newState
      }
      case DELETE_ONE:
        const copy = {...state}
        // const server_Id = action.payload["serverId"]
        // const channel_Id = action.payload['channelId']
        if (copy[action.serverId].length <=  1){
          return []
        }
        copy[action.serverId].filter(channel => {
          console.log(channel)
          return channel.id !== action.channelId;
        })
        return copy

      default:
        return state;
    }
  }
