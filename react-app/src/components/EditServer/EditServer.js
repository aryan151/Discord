import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import { getMyServers } from '../../store/server';
import './AddServerModal.css'

const EditServer = () => {
    const userId = useSelector((state) => state.session?.user?.id);


    const [serverName, setServerName] = useState('')
    
    const dispatch = useDispatch()

    
    const handleEdit = (e) => {
        e.preventDefault();
    }
    
    const handleDelete = (e) => {
        e.preventDefault();
        
    }

    return (
        <div>
            <form onSubmit={createServer}>
                <fieldset>
                    <legend>Server Edit Options</legend>
                        <div>
                            <label>Edit Server Name</label>
                            <div>
                                <input
                                type='text'
                                onChange={handleEdit}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>DELETE SERVER</label>
                            </div>
                            <div>
                                <button type='submit' onClick={handleDelete}>DELETE</button>
                            </div>
                        </div>
                        
                </fieldset>
            </form>
        </div>
    )
}

export default EditServer;
