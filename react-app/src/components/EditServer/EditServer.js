import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import { getMyServers } from '../../store/server';
import './EditServer.css'
import { useParams } from 'react-router';
import { editOneServer } from '../../store/server';
import { deleteOneServer } from '../../store/server';

const EditServer = ({serverId, setShowModal}) => {
    const userId = useSelector((state) => state.session?.user?.id);
    // const params = useParams()
    // let {serverId} = params


    const [serverName, setServerName] = useState('')
    const [editServer, setEditServer] = useState('')

    const dispatch = useDispatch()


    const handleEdit = (e) => {
        e.preventDefault()
        const payload = {
            name : editServer
        }
        dispatch(editOneServer(payload, serverId))
        setShowModal(false)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteOneServer(serverId))
        setShowModal(false)
    }

    return (
        <div>
            <form onSubmit={handleEdit}>
                <fieldset>
                    <legend>Server Edit Options</legend>
                        <div>
                            <label>edit Server Name</label>
                            <div>
                                <input
                                type='text'
                                value={editServer}
                                onChange={(e) => setEditServer(e.target.value)}
                                />
                            </div>
                            <div>
                                <button type='submit'>Update Name</button>
                            </div>
                        </div>
                </fieldset>
            </form>
            <form onSubmit={handleDelete}>

                        <div>
                            <div>
                                <label>DELETE SERVER</label>
                            </div>
                            <div>
                                <button type='submit'>DELETE Server</button>
                            </div>
                        </div>

            </form>

        </div>
    )
}

export default EditServer;
