import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { addServer } from '../../store/server'


function AddServerModal ({  }) {
    const userId = useSelector((state) => state.session?.user?.id);
    const [showModal, setShowModal] = useState(false);
    const [serverName, setServerName] = useState('')
    const dispatch = useDispatch()
    const createServer = async (e) => {
        e.preventDefault()

        const payload = {name:serverName, owner_id:userId}

        dispatch(addServer(payload))
        setServerName('')
    }

    return (
        <>
            <div className='add-server-container'  onClick={() => setShowModal(true)}>
            <span><i class="fas fa-plus"></i> Add Server</span>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <form onSubmit={createServer}>
                <label>Server Name</label>
                <input value={serverName} onChange={(e) => setServerName(e.target.value)}></input>
                <button type="submit">Create Server</button>
              </form>
            </Modal>
          )}
        </>
    )
}

export default AddServerModal;
