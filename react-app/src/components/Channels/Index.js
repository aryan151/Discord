import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchChannels } from '../../store/channel'
import './channels.css'
import { Link } from 'react-router-dom'
import AddChannelModal from '../AddChannelModal/AddChannelModal'

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
      <AddChannelModal serverId={serverId}/>
      {channels?.map(channel =>
      <Link to={`/${serverId}/${channel.id}`} className="channel">
        <span><i class="fas fa-hashtag"></i>
        <p>{channel.name}</p></span>

        <span onClickclassName="settings-cog"><i class="fas fa-cog" ></i></span>
      </Link>
        )}
    </div>
  )
}

export default Channels
