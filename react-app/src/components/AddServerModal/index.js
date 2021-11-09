import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddServer from './AddServer';



function AddServerModal () {
    const [showModal, setShowModal] = useState(false); 

    return (
        <>
            <div className='add-server-container'  onClick={() => setShowModal(true)}>
            <span><i class="fas fa-plus"></i> Add Server</span>
            </div>
            {showModal && (
            <Modal  onClose={() => setShowModal(false)}>
              <AddServer />
            </Modal>
          )}
        </>
    )
}

export default AddServerModal;
