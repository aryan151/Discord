// import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import EditServer from './EditServer';
// import './EditServer.css'

// function EditServerModal ({serverId, server}) {
//     const [showModal, setShowModal] = useState(false);

//     return (
//         <>
//             <div className='edit-server-container'  onClick={() => setShowModal(true)}>
//             {/* <i class="far fa-edit edit-server-icon"></i> */}
//             edit {server?.name}
//             </div>
//             {showModal && (
//             <Modal  onClose={() => setShowModal(false)}>
//               <EditServer serverId={serverId} setShowModal={setShowModal}/>
//             </Modal>
//           )}
//         </>
//     )
// }
// export default EditServerModal;
