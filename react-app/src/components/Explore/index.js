import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getServers, addServer } from '../../store/server'
import { Redirect } from 'react-router-dom';
import {createMemberToServer} from '../../store/membersservers'
import { getMyServers } from '../../store/server';
import './Explore.css'

function Explore() {

    const servers = useSelector(state => Object.values(state.servers));
    const userId = useSelector((state) => state.session?.user?.id);
    let history = useHistory()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getServers())
        dispatch(getMyServers(userId))
    }, [dispatch])




    const addMemberServer = (serverId) => async () => {
        // e.preventDefault()
        const payload = {
            serverId,
            userId,
        }
        dispatch(createMemberToServer(payload))
        dispatch(getMyServers(userId))
        history.push(`/${serverId}`)
        // return <Redirect to={`/${serverId}`}/>
    }

    return (
        <>
            <div className='explore-container'>
                {servers.map((server) => (
                    <div onClick={addMemberServer(server?.id)} className='explore-servers-card'>
                        <div className='explore-links-image' style={{backgroundImage: `url(${server?.avatar})`}}>
                        </div>
                            {server?.name}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Explore;
