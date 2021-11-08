import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchChannels } from '../../store/channel'
import './channels.css'

const Channels = ({id}) => {

  const params = useParams()
  let serverId = params.serverId
  // serverId = 1
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(fetchChannels(serverId));

  }, [dispatch, serverId])

  const channels = useSelector(state => state.channels[serverId])
  const server = useSelector(state => state.servers[serverId])

  return (
    <div className="channels-container">
      {server ? <h1>{server.name}</h1> : <h1>Hello from channels</h1>}

      {channels?.map(channel =>
      <div className="channel">
        <span><i class="fas fa-hashtag"></i>
        <p>{channel.name}</p></span>

        <span className="settings-cog"><i class="fas fa-cog" ></i></span>
      </div>
        )}
    </div>
  )
}

export default Channels
