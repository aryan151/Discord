import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addServer } from '../../store/server'
import { getMyServers } from '../../store/server';
import './EditServer.css'
import { useParams } from 'react-router';
import { editOneServer } from '../../store/server';
import { deleteOneServer } from '../../store/server';
import { removeOneServer } from '../../store/server';
import { useHistory } from 'react-router';

const EditServer = ({setShowMenu, server}) => {
    const userId = useSelector((state) => state.session?.user?.id);
    let history= useHistory()


    const [serverName, setServerName] = useState('')
    const [editServer, setEditServer] = useState(server?.name)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     const closeModal = () => {
    //       setShowMenu(false);
    //     };
    //     document.addEventListener('click', closeModal);
    //     return () => document.removeEventListener("click", closeModal);
    //   }, []);


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

    const removeServer = () => {
        dispatch(removeOneServer(server?.id, userId))
        dispatch(getMyServers(userId))
        history.push('/dashboard')

    }

    return (

        <>


{ server?.ownerId === userId ?

    <div className="edit-server-dropdown" >
        <div className="server-edit-form" >
                <form onSubmit={handleEdit}>

                <h3>Server Edit Options</h3>
                    <div className='rndm'>
                        <label>Edit Server Name

                        <input
                            type='text'
                            value={editServer}
                            onChange={(e) => setEditServer(e.target.value)}
                            required
                            />
                            </label>
                        <div>
                            <button className='edit-server-name' type='submit'>Update Name</button>
                        </div>
                    </div>

                </form>
                <form  className='delete-server-button-form' onSubmit={handleDelete}>

                    <button className= "delete-server" type='submit'>Delete Server</button>
                    <button className="edit-server-name" onClick={() => setShowMenu(false)}>Cancel</button>

                </form>


        </div>

    </div>

    :

    <div>

            <div className="edit-server-dropdown-non-owner">

                <button onClick={removeServer} className="unjoin-server">Unjoin server</button>
                <button className="unjoin-server" onClick={() => setShowMenu(false)}>Cancel</button>

            </div>


    </div>



    }

        </>



    )
}

export default EditServer;
