import { useState, useRef } from 'react';
import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import './MessageBox.css'
import { NimblePicker } from 'emoji-mart'
import { updateMessage } from '../../../store/message';
import {useDispatch} from 'react-redux'

function MessageBox({ message, setMessageBeingEdited, messageBeingEdited, setShowDeleteMessageModal }) {

    const editMessageRef = useRef();
    const [editedMessage, setEditedMessage] = useState(message.body);
    const [editMessageError, setEditMessageError] = useState('');
    const [messageCharacterCounter, setMessageCharacterCounter] = useState(message?.body.length);
    const [showEmojiPicker, setShowEmojiPicker] = useState('');
    const [emoji, setEmoji] = useState('😎');
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setEditedMessage(e.target.value);
        setMessageCharacterCounter(e.target.value.length);
    }

    const handleEscEnter = (e) => {
        if (e.key === "Escape") {
            setMessageBeingEdited(false);
            setEditedMessage(message.body)
            return
        }

        if (messageCharacterCounter > 2000 && e.key === "Enter") {
            e.preventDefault();
            setEditMessageError('Message cannot exceed 2000 characters.');
            return;
        }

        if (e.key === "Enter" && messageCharacterCounter === 0) {
            setEditMessageError('');
            setMessageBeingEdited(false);
            setEditedMessage(message?.body);
            setShowDeleteMessageModal(message?.id);
            return
        }

        if (/^\s*$/.test(editedMessage)) {
            return;
        }

        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    const handleCancel = () => {
        setShowEmojiPicker(false);
        setMessageBeingEdited(false);
        setEditMessageError('');
        setEditedMessage(message?.body);
        setMessageCharacterCounter(message?.body.length);
    }

    // const formattedDate = messageDate.toLocaleString();
    // const formattedTime = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    // const messageDate = new Date(message.createdAt)


//     const formatDateAndTime = (date) => {
//         const time = new Date(date).toLocaleTimeString('en');

//         const arr = date.split('-');
//         const monthAndDay = `${arr[1]}/${arr[2].slice(0,2)}/${arr[0]}`

//         return `${monthAndDay} ${time}`;

//   }

const convertTime = function(oldTime){
    let newTime = oldTime.split(' ')[1]
    let time = newTime.split(':');
    let hours = time[0];
    let minutes = time[1];
    let timeValue = "" + ((hours >12) ? hours -12 :hours);
        timeValue += (minutes < 10) ? ':' + minutes : ":" + minutes;
        timeValue += (hours >= 12) ? " pm" : " am";
        // timeValue += "" + date
        return timeValue;
    }

    const isSameDay = function(oldTime) {
        // let today = Date.now().getDate().toString()
        let newToday = new Date().getDate().toString()
        let newOldTime = new Date(oldTime).getDate()
        console.log('todays date:', newToday)
        console.log('message date:', newOldTime)
        if (newToday == newOldTime){
            return true
        }
        return false
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (messageCharacterCounter === 0) {
            setShowDeleteMessageModal(message?.id);
            setMessageBeingEdited(false);
            setEditedMessage(message?.body);
            return
        }

        if (messageCharacterCounter > 2000) {
            setEditMessageError('Message cannot exceed 2000 characters.');
            return;
        }

        if (/^\s*$/.test(editedMessage)) {
            setEditMessageError('Messages cannot contain only spaces.')
            return;
        }

        setEditMessageError('');
        setShowEmojiPicker(false);

        const newMessage = {
            body: editedMessage
        }

        dispatch(updateMessage(newMessage, message.id))
        // THIS IS WHERE YOU WOULD PASS EDIT W/O SOCKETS

        //W SOCKET:           socket.emit('message-edit', newMessage)


        setMessageBeingEdited(false);
    }

    const handleEmoji = (emoji) => {
        setEditedMessage(editedMessage + emoji.native);
        editMessageRef.current.focus();
        setShowEmojiPicker(false);
    }

    const handleEmojiPicker = () => {
        if (showEmojiPicker) {
            setShowEmojiPicker(false);
        } else {
            setShowEmojiPicker(true);
        }
    }

    return (
        messageBeingEdited === message.id ? (
            <>
                <form className="message-edit-form">
                    { showEmojiPicker &&
                        <NimblePicker
                            set='google'
                            data={data}
                            theme={"dark"}
                            style={{position: 'absolute', zIndex: 3, right: "60px", bottom: "100px"}}
                            onSelect={(emoji) => handleEmoji(emoji)}
                        />
                    }

                    <p onClick={handleEmojiPicker} className="emoji-selector-edit">{emoji}</p>

                    <textarea
                        ref={editMessageRef}
                        className="message-edit-input"
                        value={editedMessage}
                        onChange={handleChange}
                        onKeyDown={handleEscEnter}
                        rows={(editedMessage.length / 200) + 3}
                    ></textarea>
                </form>
                        <div className="message-edit-options-container">
                            <p className="message-edit-cancel">escape to <span onClick={handleCancel} className="message-edit-cancel-button">cancel</span></p>
                            <span className="message-edit-dot">|</span>
                            <p className="message-edit-save"> enter to <span onClick={handleSubmit} className="message-edit-save-button">save</span></p>
                            { editMessageError &&
                                <p className="message-edit-error">{editMessageError}</p>
                            }
                        </div>
                        <p className={`message-edit-character-counter message-edit-counter-negative-${messageCharacterCounter > 2000}`}>{messageCharacterCounter}/2000</p>
            </>
        ):(
            <div className="message-container">

                <div className='decorated'>

                        <span>
                            {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(message?.createdAt))} {new Date(message?.createdAt).getDate()}, 2021
                        </span>

                </div>
                <div className="username-message-container">
                    <div>
                        <div className='live-chat-avatar-div' style={{backgroundImage: `url(${message?.imageUrl})`}}></div>
                    </div>
                    <div>

                        <div className="date-div"><span className='username-div-message'>{message?.userName}</span><span className='time-message'>{isSameDay(message?.createdAt) === true ? "Today at  " : ''}{message?.createdAt ? convertTime(message?.createdAt) : ''}</span></div>
                        <div className="channel-content-message">{message.body}</div>

                    </div>

                </div>

            </div>
            // {message.updatedAt !== message.createdAt &&
        )
    );
}

export default MessageBox;
