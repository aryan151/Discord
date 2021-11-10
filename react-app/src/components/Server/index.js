import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMyServers} from '../../store/server'
import { Link } from 'react-router-dom'
import AddServerModal, { addServerModal } from '../AddServerModal'
import { useParams } from 'react-router';
import './Server.css'

function Server () {
    const params = useParams()
    let {serverId} = params

    // const [homeServer, setHomeServer] = useState(null)
    const user = useSelector((state) => state.session?.user);
    const homeServer = useSelector(state => Object.values(state.servers).find(server => server.name == user.username))
    const userId = useSelector((state) => state.session?.user?.id);
    // const [servers, setServers] = useState([])

    const servers = useSelector(state => Object.values(state.myServers));

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyServers(userId))
        // fetch(`/api/servers/${userId}`)
        // .then((data) => data.json())
        // .then((servers) => setServers(servers.servers)

    }, [dispatch, serverId])


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



    return (
        <div className='server-container'>

           { homeServer && <Link className='server-links'to={`/${homeServer.id}`}>
                <div className='server-links-div' style={{backgroundImage: `url(${homeServer?.avatar})`}}>
                    {serverInitials(homeServer?.name)}
                </div>
            </Link>}
            {servers.map((server) => (
            server !== homeServer &&
            <Link className='server-links'to={`/${server?.id}`}>

                <div className='server-links-div' style={{backgroundImage: `url(${server?.avatar})`}}>
                    {serverInitials(server?.name)}
                </div>
            </Link>
            ))}
            <div className='server-links-div' >
            <AddServerModal />
            </div>
            <div className='server-links-div'>
                <Link to='/explore'>Explore</Link>
            </div>

        </div>
    )
}

export default Server;
