import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { useParams } from 'react-router'
import { addChannel, fetchChannels } from '../../store/channel'
import './AddChannelModal.css'


function AddChannelModal ({serverId}) {  
    // const userId = useSelector((state) => state.session?.user?.id);

    const [showModal, setShowModal] = useState(false);
    const [channelName, setChannelName] = useState('')
    const dispatch = useDispatch()
    const [sentRequest, setSentRequest] = useState(false)

    const createChannel = (e) => {
        e.preventDefault()
        const payload = {name:channelName, serverId}
        setSentRequest(false)
        dispatch(addChannel(payload))
        // dispatch(fetchChannels(serverId))
        setChannelName('')
        setSentRequest(true)
        setShowModal(false)
    }

    const handleEnter = (e) => {
      if (e.key === 'Enter'){
        e.preventDefault()
        window.alert('Press use the Create Button')
      }
    }
    useEffect(() => {
      if (sentRequest){
        setTimeout(()=> {
          dispatch(fetchChannels(serverId))
        },[30])

      }
    }, [sentRequest])

    // useEffect(() => {
    //   if (!channelName.length){

    //   }  
    // }, [channelName])      
    return (
        <>
            <div className='add-server-container'>
                <div className="add-channel" onClick={() => {setShowModal(true); setChannelName("")}}>Add Channel</div>
            </div>
            {showModal && (
            <Modal onClose={() => {setShowModal(false); setChannelName('')}}>
              <form onSubmit={e =>createChannel(e)} onKeyDown={handleEnter} className="create-channel">
                <h2>Create New Channel</h2>

                <label>Channel Name</label>
                <input value={channelName} onChange={e =>
                setChannelName(e.target.value) }
                //  placeholder="new-channel"
                 required
                ></input>
                <div className="button-container">
                <span onClick={()=> setShowModal(false)}>cancel</span>
                <button className={!channelName.length ? "empty" : "not-empty"}type="submit">Create Channel</button>
                </div>
              </form>
            </Modal>
          )}
        </>
    )
}

export default AddChannelModal;
