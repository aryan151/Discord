import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchChannels } from '../../store/channel'
import './channels.css'
import { Link } from 'react-router-dom'
import AddChannelModal from '../AddChannelModal/AddChannelModal'
import Explore from '../Explore'
import { getMyServers } from '../../store/server'
import ChannelEdit from './edit-channel'
import HomeServer from '../Server/HomeServer'


const Channels = ({id}) => {

  const params = useParams()
  let serverId = params?.serverId
  const [showSettings, setShowSettings] = useState(false);
  const [channelToEdit, setChannelToEdit] = useState();
  // serverId = 1
  const userId = useSelector(state => state.session?.user?.id)
  const channels = useSelector(state => state.channels[serverId])
  const server = useSelector(state => state.servers[serverId])
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(fetchChannels(serverId));
    dispatch(getMyServers(userId))

  }, [dispatch, serverId, showSettings])

  const handleEdit = (channel) => {
    setChannelToEdit(channel)
    setShowSettings(true)
  }

  if (window.location.href.includes("home")){
    return <HomeServer id={serverId}/>
  }


  return (

    <>
      {serverId === 'explore' ? <Explore /> :
      <div className="channels-container">
        {server ? <h1>{server?.name}</h1> : <h1>Hello from channels</h1>}

       { (server?.ownerId == userId) && <AddChannelModal serverId={serverId}/>}
        {channels?.map(channel =>

        <Link to={`/${serverId}/${channel?.id}`} className="channel">
          <span><i class="fas fa-hashtag"></i>
          <p>{channel?.name}</p></span>

         { (server?.ownerId == userId) && <span className="settings-cog" onClick={() => handleEdit(channel)}><i class="fas fa-cog" ></i></span>}
        </Link>

          )}
      </div>}

      {showSettings && <ChannelEdit channel={channelToEdit} serverId={serverId} setShowSettings={setShowSettings} showSettings={showSettings}/>}
    </>

  )
}

export default Channels
