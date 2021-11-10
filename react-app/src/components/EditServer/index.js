import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditServer from './EditServer';
function EditServerModal () {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='add-server-container'  onClick={() => setShowModal(true)}>
            <span><i class="far fa-edit"></i> Edit Server</span>
            </div>
            {showModal && (
            <Modal  onClose={() => setShowModal(false)}>
              <EditServer setShowModal={setShowModal}/>
            </Modal>
          )}
        </>
    )
}
export default EditServerModal