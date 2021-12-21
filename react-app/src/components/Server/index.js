import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMyServers} from '../../store/server'
import { Link } from 'react-router-dom'
import AddServerModal, { addServerModal } from '../AddServerModal'
import { useParams } from 'react-router';
import { getServers } from '../../store/server';
import HomeServer from './HomeServer';
import './Server.css'
import EditServerModal from '../EditServer';
import { getServerMembers } from '../../store/membersservers';
// import {fetchChannels} from '../../store/channel'

function Server () {
    const params = useParams()
    let {serverId} = params
    const [homeServer, setHomeServer] = useState(null);
    // const [homeServer, setHomeServer] = useState(null)
    const user = useSelector((state) => state.session?.user);
    // const ownedServers = useSelector(state => Object.values(state.servers).filter((server) => server?.ownerId == user?.id))
    const userId = useSelector((state) => state.session?.user?.id);
    // const [servers, setServers] = useState([])
    const servers = useSelector(state => Object.values(state.myServers))

    const dispatch = useDispatch()
    useEffect(() => {
        if (serverId) {
            dispatch(getServerMembers(serverId))
        }
        dispatch(getMyServers(userId))
        dispatch(getServers())
        fetch(`/api/servers/home/${user.username}`)
        .then((data) => data.json())
        .then((server) => setHomeServer(server))

    }, [dispatch, serverId, user])


    const serverInitials = (name)=> {
        if (!name) return
        if (!name.includes(' ')) {
            return String(name[0]).toUpperCase()
        } else {
            let newName = name.trim()
            let initials = ''
            let array = newName.split(' ')
            for (let i = 0; i < array.length; i++){
                let word = array[i]
                initials += String(word[0]).toUpperCase()
            }
            return initials
        }
    }

    function handleRightClick (e) {
        if (e.type === 'contextmenu') {
            window.alert('right click')
        }
    }




    return (
        <div className='server-container'>

            <div id="home-plus-dm's-server-div">

                    <div className="home-server">
                        <Link className='server-links' to={`/dashboard`}>
                            <div className='server-links-div' style={{backgroundImage: `url("https://i.ibb.co/1rPFJn2/wavey-discord-logo.png")`}}>
                                Home
                            </div>

                        </Link>
                    </div>

                { homeServer &&
                    <div className="home-server">
                        <Link className='server-links' to={`/home/${homeServer.id}`}>
                            <div className='server-links-div' style={{backgroundImage: `url(${homeServer?.avatar})`}}>
                                DM's
                            </div>

                        </Link>
                    <div className="home-divider">_______</div>
                    </div>}

            </div>

            <div className="joined-servers-div">

                {servers.map((server) => (
                server !== homeServer &&
                <div>
                    <Link className='server-links' to={`/${server?.id}`}>
                        <div className='server-links-div' style={{backgroundImage: `url(${server?.avatar})`}}>
                            {serverInitials(server?.name)}
                        </div>
                    </Link>

                </div>
                ))}

            </div>


                    <div className='add-server-modal' >
                    <AddServerModal servers={servers} />
                    </div>
                    <div className='server-links-explore'>
                        <Link to='/explore'><div className="explore-server-icon"><i className="fas fa-compass"></i></div></Link>
                    </div>


        </div>
    )
}

export default Server;
