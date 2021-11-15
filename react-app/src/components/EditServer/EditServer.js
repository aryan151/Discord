import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import { getMyServers } from '../../store/server';
import './EditServer.css'
import { useParams } from 'react-router';
import { editOneServer } from '../../store/server';
import { deleteOneServer } from '../../store/server';

const EditServer = ({serverId, setShowMenu}) => {
    const userId = useSelector((state) => state.session?.user?.id);
    // const params = useParams()
    // let {serverId} = params


    const [serverName, setServerName] = useState('')
    const [editServer, setEditServer] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        const closeModal = () => {
          setShowMenu(false);
        };
        document.addEventListener('click', closeModal);
        return () => document.removeEventListener("click", closeModal);
      }, []);


    const handleEdit = (e) => {
        e.preventDefault()
        const payload = {
            name : editServer
        }
        dispatch(editOneServer(payload, serverId))
        setShowMenu(false)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteOneServer(serverId))
        setShowMenu(false)
    }

    return (
        <div className="edit-server-dropdown" onClick={e => e.stopPropagation()}>
            <form className="server-edit-form" onSubmit={handleEdit}>

            <h3>Server Edit Options</h3>
                <div className='rndm'>
                    <label>Edit Server Name</label>
                      <input
                        type='text'
                        value={editServer}
                        onChange={(e) => setEditServer(e.target.value)}
                        required
                        />
                    <div>
                        <button className='edit-server-name' type='submit'>Update Name</button>
                    </div>
                </div>

            </form>
            <form  className='delete-server-button-form' onSubmit={handleDelete}>

                <button className= "delete-server" type='submit'>Delete Server</button>

            </form>

        </div>
    )
}

export default EditServer;
