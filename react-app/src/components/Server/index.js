import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getServers, addServer } from '../../store/server'
import { Link } from 'react-router-dom'
import AddServerModal, { addServerModal } from '../AddServerModal'
import './Server.css'

function Server () {

    const userId = useSelector((state) => state.session?.user?.id);
    const servers = useSelector(state => Object.values(state.servers));

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    // const [serverName, setServerName] = useState('')

    // const createServer = async (e) => {
    //     e.preventDefault()

    //     const payload = {name:serverName, owner_id:userId}

    //     dispatch(addServer(payload))
    //     setServerName('')
    // }

    const serverInitials = (name)=> {
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
            {servers.map((server) => (
            <Link className='server-links'to={`/${server.id}`}>
                <div className='server-links-div' style={{backgroundImage: `url(${server?.avatar})`}}>
                    {serverInitials(server?.name)}
                </div>
            </Link>
            ))}
            <div className='server-links-div' >
            <AddServerModal />
            </div>

            {/* <form onSubmit={createServer}>
                <label>Server Name</label>
                <input value={serverName} onChange={(e) => setServerName(e.target.value)}></input>
                <button type="submit">Create Server</button>
            </form> */}

        </div>
    )
}

export default Server;
