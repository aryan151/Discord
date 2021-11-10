import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { useParams } from 'react-router'
import { addChannel, fetchChannels } from '../../store/channel'



function AddChannelModal ({serverId}) {
    // const userId = useSelector((state) => state.session?.user?.id);

    const [showModal, setShowModal] = useState(false);
    const [channelName, setChannelName] = useState('')
    const dispatch = useDispatch()


    const createChannel = async (e) => {
        e.preventDefault()

        const payload = {name:channelName, serverId}

        dispatch(addChannel(payload))
        dispatch(fetchChannels(serverId))
        setChannelName('')
        setShowModal(false)
    }

    return (
        <>
            <div className='add-server-container'>
                <div className={showModal ? '' :  "far fa-edit"} onClick={() => setShowModal(true)}>Add Channel</div>
            </div>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <form onSubmit={createChannel}>
                <label>Channel Name</label>
                <input value={channelName} onChange={(e) => setChannelName(e.target.value)}></input>
                <button type="submit">Create Channel</button>
              </form>
            </Modal>
          )}
        </>
    )
}

export default AddChannelModal;
