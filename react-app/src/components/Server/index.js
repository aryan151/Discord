import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getServers, addServer } from '../../store/server'
import { Link } from 'react-router-dom'

function Server () {

    const userId = useSelector((state) => state.session?.user?.id);
    const servers = useSelector(state => Object.values(state.servers));

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getServers())
    }, [dispatch])

    const [serverName, setServerName] = useState('')

    const createServer = async (e) => {
        e.preventDefault()

        const payload = {name:serverName, owner_id:userId}

        dispatch(addServer(payload))
        setServerName('')
    }



    return (
        <div className='server-container'>
            {servers.map((server) => (
                <div>
                    <Link to={`/${server.id}`}>{server?.name}</Link>
                </div>
            ))}

            <form onSubmit={createServer}>
                <label>Server Name</label>
                <input value={serverName} onChange={(e) => setServerName(e.target.value)}></input>
                <button type="submit">Create Server</button>
            </form>

        </div>
    )
}

export default Server;
