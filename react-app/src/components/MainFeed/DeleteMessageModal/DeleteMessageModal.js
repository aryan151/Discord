import './DeleteMessageModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneMessage } from '../../../store/message';

function DeleteMessageModal ({ message, onClose }) {

    // const messageDate = new Date(message.createdAt)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const submitDelete = (e) => {
        e.preventDefault();
        dispatch(deleteOneMessage(message.id))
        onClose();
    }

    return (
        <form onSubmit={submitDelete} className="delete-message-form">
            <h1 className="delete-message-header">Delete Message</h1>
            <div className="delete-message-content">
                <p className="delete-message-subheader">Are you sure you want to delete this message?</p>
                <div className="delete-message-card">
                    <img className="delete-message-profile-picture" src='https://image.shutterstock.com/image-illustration/red-stamp-on-white-background-260nw-1165179109.jpg' alt="" />
                    <div className="delete-message-username-content">
                        <p className="delete-message-username">{user.username}<span className="delete-message-datetime">Date</span></p>
                        <div className="channel-content-message">{message.body} <span className="message-edited-true">(edited)</span></div>
                    </div>
                </div>
            </div>
            <div className="delete-message-cancel-submit-container">
                <p className="delete-message-cancel" onClick={onClose}>Cancel</p>
                <button className={`delete-message-button`} >Delete</button>
            </div>
        </form>
    );
}

export default DeleteMessageModal;
