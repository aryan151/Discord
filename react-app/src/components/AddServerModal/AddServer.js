import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import './AddServerModal.css'

function AddServer(){
    const userId = useSelector((state) => state.session?.user?.id);
    

    const [serverName, setServerName] = useState('')
    const dispatch = useDispatch()
    const createServer = async (e) => {
        e.preventDefault()

        const payload = {name:serverName, owner_id:userId}

        dispatch(addServer(payload))
        setServerName('')
 
    }
    
    return (
        <div className='form-container'>
            <form className='form' onSubmit={createServer}>
                    <legend>Server Name</legend>
                        <div>
                            <input type="text"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            />        
                        </div>
                        <div>
                            <button 
                            type="submit"
                            onClick={createServer}
                            >Create Server</button>
                        </div>
            </form>
        </div>
    )
}

export default AddServer;