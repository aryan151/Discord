import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import { getMyServers } from '../../store/server'; 
import {createMemberToServer} from '../../store/membersservers' 
import './AddServerModal.css'
  
function AddServer({ setShowModal, servers }){
      
    const userId = useSelector((state) => state.session?.user?.id);


    const [serverName, setServerName] = useState('')     
    const [enteredPassword, setEnteredPassword] = useState('') 

    const dispatch = useDispatch()

    
    const createServer = async (e) => {
        e.preventDefault()

        const payload = {name:serverName, owner_id:userId}

        dispatch(addServer(payload))
        dispatch(getMyServers(userId))  
        setServerName('')  
        setShowModal(false)

    }       
             
    const joinServer = (enteredPassword) => async () => {
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
  //Change line 51 -using to test 
    return (
        <div>  
            <form onSubmit={createServer}>    
                <fieldset>
                    <legend>Server Name </legend>
                        <div>
                            <input
                            type="text"  
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                            type="submit"
                            onClick={createServer}
                            >Create Server
                            </button>
                        </div> 
                        <p>Join A Server</p>
                        <div>
                            <input
                            type="text"
                            value={enteredPassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}  
                            />
                        </div>
                        <div>
                            <button
                            type="submit"
                            onClick={joinServer}  
                            >Join Server 
                            </button>
                        </div> 
                    </fieldset>
            </form>
        </div>
    )
}

export default AddServer;
