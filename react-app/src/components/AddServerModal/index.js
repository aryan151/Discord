import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddServer from './AddServer';
import './AddServerModal.css'



function AddServerModal ({servers}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='add-server-container'  onClick={() => setShowModal(true)}>
              <div id="add-server-icon-div">
                <i class="fas fa-plus"></i>
              </div>
            </div>
            {showModal && (
            <Modal  onClose={() => setShowModal(false)}>
              <AddServer servers={servers} setShowModal={setShowModal}/>
            </Modal>
          )}
        </>
    )
}

export default AddServerModal;
