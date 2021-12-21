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

import LoggedIn from '../LoggedIn'
import EditServer from '../EditServer/EditServer'



const Channels = ({id}) => {

  const params = useParams()
  let serverId = params?.serverId
  const [showSettings, setShowSettings] = useState(false);
  const [channelToEdit, setChannelToEdit] = useState();
  const userId = useSelector(state => state.session?.user?.id)
  const channels = useSelector(state => state.channels[serverId])
  const server = useSelector(state => state.myServers[serverId])
  // console.log('serverrrr', server)
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(fetchChannels(serverId));
    dispatch(getMyServers(userId))
    setShowMenu(false)

  }, [dispatch, serverId, showSettings])


  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleEdit = (channel) => {
    setChannelToEdit(channel)
    setShowSettings(true)
  }

  if (window.location.href.includes("home")){
    return <HomeServer id={serverId}/>
  }




  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };



  return (

    <>
      {serverId === 'explore' ? <Explore /> :
      <div className="channels-container">
        <div className="scroll">

          {serverId && (<div>
            <div className="edit-server-div">
            <span id="server-name-in-channel">{server?.name}</span>

              <span className="edit-server-buttons">
                <span className={showMenu === false ? "plus-color" : "minus-color"}>
                <i id="edit-server-button" onClick={showMenu === false ? openMenu : closeMenu} className={showMenu === false ? "fas fa-chevron-down" : "fas fa-minus edit-server-icon"}></i>
                </span>

              </span>

            </div>

          </div>)}

           {showMenu && (

               <EditServer setShowMenu={setShowMenu} server={server}/>

              )}

       { (server?.ownerId == userId) && <AddChannelModal serverId={serverId}/>}
        {channels?.map(channel =>

        <Link to={`/${serverId}/${channel?.id}`} className="channel">
          <span><i class="fas fa-hashtag"></i>
          <p>{channel?.name}</p></span>

         { (server?.ownerId == userId) && <span className="settings-cog" onClick={() => handleEdit(channel)}><i class="fas fa-cog" ></i></span>}
        </Link>

          )}
          </div>
          <LoggedIn />
      </div>}

      {showSettings && <ChannelEdit channel={channelToEdit} serverId={serverId} setShowSettings={setShowSettings} showSettings={showSettings}/>}
    </>

  )
}

export default Channels
