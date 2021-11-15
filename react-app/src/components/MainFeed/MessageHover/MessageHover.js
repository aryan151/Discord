import './MessageHover.css'

function MessageHover({ message, setMessageBeingEdited, setShowMessagePopup, setShowDeleteMessageModal }) {

    const handleDelete = () => {
        setMessageBeingEdited(false);
        setShowDeleteMessageModal(message.id);
        setShowMessagePopup(false);
    }

    return (
        <>
            <div className="track-to-prevent-hover-above">
                <div className="message-hover-container">
                    <span className="material-icons message-edit-icon" onClick={() => setMessageBeingEdited(message.id)}>edit</span>
                    <span className="material-icons message-delete-icon" onClick={handleDelete}>delete</span>
                </div>
            </div>
        </>
     );
}

export default MessageHover;
