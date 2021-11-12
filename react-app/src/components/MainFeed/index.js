import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import { NimblePicker  } from 'emoji-mart'
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom';
import '../Dashboard/dashboard.css'
import { getMessages, createOneMessage } from '../../store/message';

import DeleteMessageModal from './DeleteMessageModal'
import MessageBox from './MessageBox'
import MessageHover from './MessageHover'
import { Modal } from '../../context/Modal'

import './MainFeed.css'

import { io } from 'socket.io-client';
let socket;



export const MainFeed = () => {

    const params = useParams()
    let {serverId, channelId} = params
    const messageRef = useRef();
    const scrollRef = useRef();
    const [body, setBody] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState('');
    const [emoji, setEmoji] = useState('😎');
    const [messageCharacterCounter, setMessageCharacterCounter] = useState(0);
    const [messageError, setMessageError] = useState('');
    const [showHoverTime, setShowHoverTime] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [messageBeingEdited, setMessageBeingEdited] = useState(false);
    const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
    const [chat, setChat] = useState([])

    const history = useHistory()
    const userId = useSelector((state) => state.session?.user?.id);
    let messages = useSelector((state) => state?.messages[channelId])
    //const orderedMessages = messages.sort((a, b) => a.createdAt < b.createdAt ? 1: -1)
    let channel = useSelector(state => state.channels[serverId]?.find(channel => channelId == channel.id))
    let general = useSelector(state => state.channels[serverId]?.find(channel => channel.name == "general"))
    const dispatch = useDispatch()



    const [chatInput, setChatInput] = useState("");
    const [chatmessages, setChatMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();
        socket.on('connect', function() {
            socket.emit('join', channelId )
        })

        socket.on("chat", (data) => {
            console.log('recieved socket message!!', data)
            let chat = data.split('@')[0]
            let user = data.split('@')[1]
            let avatar = data.split('@')[2]
            // setChatMessages((message) => [data, ...message])
            setChatMessages((message) => [[chat, user, avatar], ...message])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [dispatch])





    //Sockets? Maybe --> pass socket={socket} where needed
    // useEffect(() => {
    //     socket.on('receive-message', message => {
    //         dispatch(addMessage(message));
    //     });

    //     socket.on('receive-message-edit', message => {
    //         dispatch(editMessage(message));
    //     });

    //     socket.on('receive-message-delete', deletedMessageId => {
    //         dispatch(deleteMessage(deletedMessageId));
    //     })
    // }, [dispatch, socket])




    useEffect(() => {
        if (channelId){
            dispatch(getMessages(channelId))
        }

    }, [dispatch, channelId, serverId])

    useEffect(() => {
        if (!showEmojiPicker) return;

        const closeMenu = () => {
            setShowEmojiPicker(false);
        };

        document.querySelector('.new-message-input').addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showEmojiPicker]);


    const handleEmojiPicker = () => {
        if (showEmojiPicker) {
            setShowEmojiPicker(false);
        } else {
            setShowEmojiPicker(true);
        }
    }

    const handleChange = (e) => {
        setBody(e.target.value)
        setMessageCharacterCounter(0+e.target.value.length)
    }

    //Create Message
    const createMessage = async (e) => {
        e.preventDefault()
        const payload = {
            body,
            userId
        }
        dispatch(createOneMessage(payload, channelId))
        socket.emit("chat", { 'msg': `${body}@${user?.username}@${user?.avatar}`, 'channelId': channelId, 'user': user?.username})
        // dispatch(getMessages(channelId))
        setBody('')
        setChatInput("")
        setMessageCharacterCounter(0)
    }

    //Prevents Blank Messages
    const handleEnter = (e) => {
        if (messageCharacterCounter > 2000 && e.key === "Enter") {
            e.preventDefault();
            setMessageError('Message cannot exceed 2000 characters.');
            return;
        }

        if (/^\s*$/.test(body)) {
            return;
        }

        if (e.key === "Enter") {
            createMessage(e);
            setMessageError('')
        }
    }

    const handleHoverOn = (messageId) => {
        setShowHoverTime(messageId);
        setShowMessagePopup(messageId)
    }

    const handleHoverOff = () => {
        setShowHoverTime(false)
        setShowMessagePopup(false)
    }

    const handleEmoji = (emoji) => {
        setBody(body + emoji.native);
        messageRef.current.focus();
        setShowEmojiPicker(false);
    }





    if (serverId === 'explore') return null;


    if (!messages) {
        if(!channelId) {
            if (general){
                history.push(`/${serverId}/${general.id}`)
            }
            return null;
        }

        return (
            <div className="empty-channel">
            <h2>Welcome to {channel ? channel.name + "!": "the channel!"}</h2>
            <p>This is just the beginning. <br /> Be the first to leave a message.</p>
            <form onSubmit={createMessage}>
            <input value={body} onChange={handleChange}></input>
            <button type="submit">Send Message</button>
             </form>
            </div>
        );
    }

    return (
        <div className="Message-content-outer-container">

            <div className="Message-content-container">
                <div className="Message-content-header-container">
                    <span className="Message-content-header-hashtag">#</span>
                    <h1 className="Message-content-header">{channel?.name}</h1>
                    <p className="channel-description" > <span className="vert-line">|</span> {channel?.description.slice(0, 100) + "..."}</p>
                </div>
                <div className="Main-Message-content">
                {chatmessages.map((message) => (
                    <div className="live-chat-div">

                        <div className="username-message-container">
                        <div className='live-chat-avatar-div' style={{backgroundImage: `url(${message[2]})`}}></div>
                            <div className="channel-content-message">
                                {`${message[1]}:${message[0]}`}
                            </div>
                        </div>

                    </div>
                        ))}
                {messages.map((message, index)  => {
                        const nextMessage = messages[index+1]
                        const NextHasSameOwner = nextMessage?.User?.id === message?.User?.id
                        const Mdate = 'date'
                        const MTime = 'time'


                        return (
                            <div key={message?.id}>
                            { showDeleteMessageModal === message?.id &&
                                <Modal onClose={() => setShowDeleteMessageModal(false)} message={message}>
                                    <DeleteMessageModal onClose={() => setShowDeleteMessageModal(false)} message={message}/>
                                </Modal>
                            }
                            { NextHasSameOwner ? (
                                <div
                                className="message-without-profile-pic-container"
                                onMouseOver={() => handleHoverOn(message.id)}
                                onMouseLeave={handleHoverOff}
                                >
                                <div className="message-profile-standin">
                                    { showHoverTime === message.id && <p className="message-hover-time">{MTime}</p>}
                                </div>
                                <div className="username-message-container">
                                    <MessageBox
                                        setMessageBeingEdited={setMessageBeingEdited}
                                        message={message}
                                        messageBeingEdited={messageBeingEdited}
                                        setShowDeleteMessageModal={setShowDeleteMessageModal}
                                    />
                                </div>
                                { showMessagePopup === message.id && userId === message.userId && <MessageHover message={message} setMessageBeingEdited={setMessageBeingEdited} setShowMessagePopup={setShowMessagePopup} setShowDeleteMessageModal={setShowDeleteMessageModal}/>}
                                </div>
                            ):(
                                <div
                                    className="message-with-profile-pic-container"
                                    onMouseOver={() => handleHoverOn(message.id)}
                                    onMouseLeave={handleHoverOff}
                                >
                                <div className="message-profile-pic-container">
                                    <img className="message-profile-pic" src='https://image.shutterstock.com/image-illustration/red-stamp-on-white-background-260nw-1165179109.jpg' alt="" />
                                </div>
                                <div className="username-message-container">
                                    <div className="message-username">{message.User.username}<span className="message-date-time">{Mdate}</span></div>
                                    <MessageBox
                                        setMessageBeingEdited={setMessageBeingEdited}
                                        message={message}
                                        messageBeingEdited={messageBeingEdited}
                                        setShowDeleteMessageModal={setShowDeleteMessageModal}
                                    />
                                </div>
                                { showMessagePopup === message.id && userId === message.userId && <MessageHover message={message} setMessageBeingEdited={setMessageBeingEdited} setShowMessagePopup={setShowMessagePopup} setShowDeleteMessageModal={setShowDeleteMessageModal}/>}
                                </div>
                            )}
                            </div>
                        )
                    })}
                    <div className="Main-Message-content">
                        {/* {chatmessages.map((message) => (
                            <div className="message-without-profile-pic-container">{message}</div>
                        ))} */}

                    </div>
                </div>

                <div onSubmit={createMessage} className="channel-content-chat-input-container">
                    <form className="new-message-form">
                        { showEmojiPicker &&
                            <NimblePicker
                                set='google'
                                data={data}
                                theme={"dark"}
                                style={{position: 'absolute', zIndex: 3, left: "10px", bottom: "100px"}}
                                onSelect={(emoji) => handleEmoji(emoji)}
                            />
                        }

                        <p onClick={handleEmojiPicker} className="emoji-selector">{emoji}</p>
                        <label className="new-message-label">
                            <textarea
                                type="text"
                                className="new-message-input"
                                value={body}
                                onChange={handleChange}
                                onKeyDown={handleEnter}
                                ref={messageRef}
                                placeholder={`Message #${channel?.name}`}
                            ></textarea>
                            <p className={`message-character-counter message-counter-negative-${messageCharacterCounter > 2000}`}>{messageCharacterCounter}/2000</p>
                            { messageError &&
                                <p className="message-error">{messageError}</p>
                            }
                        </label>
                    </form>
                </div>
            </div>
        </div>
     );
}




{/* //     {messages?.map((message) => (
                <div>
                    <div className='message-body-div'>{message?.body}</div>
                </div>
            ))} */}
