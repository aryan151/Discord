
import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { Modal } from '../../context/Modal';
import LoggedInModal from './LoggedIn-Modal'
import './LoggedIn.css'

function LoggedIn () {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector(state => state.session?.user)
    return (
        <div className="loggedin-container">
            <div className="left-loggedin">
                <div className="user-avatar"style={{backgroundImage: `url(${user?.avatar})`}}></div>
                <div>{user?.username}</div>
            </div>
            {/* <LogoutButton /> */}
            <div className='edit-server-container'  onClick={() => setShowModal(true)}>
            <i class="far fa-edit edit-server-icon"></i>
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
