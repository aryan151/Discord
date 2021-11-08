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

  return (
    <div className="channels-container">
      <h1>Hello from channels</h1>
      {channels?.map(channel =>
      <div className="channel">
        <i class="fas fa-hashtag"></i>
        <p>{channel.name}</p>
        <i class="fas fa-cog"></i>
      </div>
        )}
    </div>
  )
}

export default Channels
