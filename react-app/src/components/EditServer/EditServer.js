import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import { getMyServers } from '../../store/server';
import './EditServer.css'
import { useParams } from 'react-router';
import { editOneServer } from '../../store/server';
import { deleteOneServer } from '../../store/server';

const EditServer = ({setShowMenu, server}) => {
    const userId = useSelector((state) => state.session?.user?.id);


    const [serverName, setServerName] = useState('')
    const [editServer, setEditServer] = useState(server?.name)

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
        dispatch(editOneServer(payload, server?.id))
        setShowMenu(false)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteOneServer(server?.id))
        setShowMenu(false)
    }

    return (
        <div className="edit-server-dropdown" >


            { server?.ownerId === userId ?

            <div className="server-edit-form" >
                    <form onSubmit={handleEdit}>

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


            :

            <button>Unjoin server</button>

            }

        </div>
    )
}

export default EditServer;
