import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import { getMyServers } from '../../store/server';
import {createMemberToServer} from '../../store/membersservers'
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { getServers } from '../../store/server';

import './AddServerModal.css'

function AddServer({ setShowModal, servers }){
    let history = useHistory()

    const userId = useSelector((state) => state.session?.user?.id);
    const [serverName, setServerName] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const allServers = useSelector(state => state.servers)
    console.log('all Servers, ', allServers)
    const [count, setCount] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getServers)
    })
    useEffect(() => {

        let count = 0
        for (let i = 0; i < allServers.length; i++) {
            count +=1
        }
        setCount(count)
    }, [allServers])


    const createServer = async (e) => {
        e.preventDefault()

        const payload = {name:serverName, owner_id:userId}

        dispatch(addServer(payload))
        dispatch(getMyServers(userId))
        setServerName('')
        setShowModal(false)
        history.push(`/${count}`)
    }

    const joinServer = async (e) => {
        e.preventDefault()
        servers.map(server => {
            if (enteredPassword === server.join_password ) {
                const payload = {
                    serverId: server.id,
                    userId,
                }
                dispatch(createMemberToServer(payload))
                dispatch(getMyServers(userId))
                setShowModal(false)
                return
            }
        })
        alert('That Server Does Not Exit')
        dispatch(getMyServers(userId))
        setShowModal(false)
    }

    return (
        <div>
            <form className='formContainer'>
                <fieldset>
                    <div className='formField'>
                    <legend className='servername'>Add Your Own Server </legend>
                    <h1>Create Your Own Server</h1>
                    <label className='ServerCreateLabel'> Name</label>
                    <div>
                            <input
                            className='ServerCreateButton'
                            type="text"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            />
                        </div>
                        <label className='ServerCreateLabel'> Description</label>
                            <input
                            className='ServerCreateButton'
                            type="text"
                            />
                        <label className='ServerCreateLabel'>Choose Your Tag </label>
                        <div className='loginButtons'>
                            <button
                            className="formButton"
                            type="submit"
                            onClick={createServer}
                            >Gaming
                            </button>
                        </div>
                        <div className='loginButtons'>
                            <button
                            className="formButton"
                            type="submit"
                            onClick={createServer}
                            >Music
                            </button>
                        </div>
                        <div className='loginButtons'>
                            <button
                            className="formButton"
                            type="submit"
                            onClick={createServer}
                            >Videos
                            </button>
                        </div>
                        <div className='loginButtons'>
                            <button
                            className="formButton"
                            type="submit"
                            onClick={createServer}
                            >Tech
                            </button>
                        </div>
                        <div className='loginButtons'>
                            <button
                            className="formButton"
                            type="submit"
                            onClick={createServer}
                            >Sports
                            </button>
                        </div>
                        <div className='loginButtons'>
                            <button
                            className="formButton"
                            type="submit"
                            onClick={createServer}
                            >Misc.
                            </button>
                        </div>
                        </div>



                    </fieldset>
            </form>
        </div>
    )
}

export default AddServer;
