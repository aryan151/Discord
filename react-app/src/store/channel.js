const LOAD_CHANNELS = 'channels/GET_CHANNELS'

const getChannelsForServer = (channels) => ({
  type: LOAD_CHANNELS,
  channels
})



export const fetchChannels = (serverId) =>  async (dispatch) => {
  const channels = await fetch(`/api/channels/${serverId}`)
  const data = await channels.json();
    console.log(data)
    dispatch(getChannelsForServer(data))



}

  const initialState = {}

  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_CHANNELS:
        const newState = {...initialState}
        const serverId = Object.keys(action.channels)[0]
        newState[serverId] = action.channels[serverId]

        return newState

      default:
        return state;
    }
  }