
import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { Modal } from '../../context/Modal';
import LoggedInModal from './LoggedIn-Modal'
import './LoggedIn.css'

function LoggedIn () {
    const [showModal, setShowModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const user = useSelector(state => state.session?.user)
    return (
        <div className="loggedin-container">
            <div className="left-loggedin">
                <div className="user-avatar"style={{backgroundImage: `url(${user?.avatar})`}}></div>
                <div id="username-bottom-channels-bar">{user?.username}</div>
            </div>
            <div className='edit-server-container edit-user'  onClick={() => setShowModal(true)}>
                <span><i class="fas fa-cog"></i></span>
            </div>
            {showModal && (
            <Modal  onClose={() => setShowModal(false)}>
              {/* <EditServer serverId={serverId} setShowModal={setShowModal}/> */}
              <LoggedInModal setShowModal={setShowModal}/>
            </Modal>
          )}

        </div>
    )
}

export default LoggedIn
