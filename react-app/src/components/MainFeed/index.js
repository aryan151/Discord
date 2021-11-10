
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import '../Dashboard/dashboard.css'
import { getMessages, createOneMessage } from '../../store/message';

import './MainFeed.css'


export const MainFeed = () => {

    const params = useParams()
    let {serverId, channelId} = params
    const [body, setBody] = useState('')
    let messages = useSelector((state) => state?.messages[channelId])
    const userId = useSelector((state) => state.session?.user?.id);

    const dispatch = useDispatch()
    useEffect(() => {
        if (channelId){
            dispatch(getMessages(channelId))
        }

    }, [dispatch, channelId, serverId])

    let channel = useSelector(state => state.channels[serverId]?.find(channel => channelId == channel.id))

    const createMessage = async (e) => {
        e.preventDefault()
        const payload = {
            body,
            userId
        }
        await dispatch(createOneMessage(payload, channelId))
        dispatch(getMessages(channelId))
        setBody('')
    }
    if (serverId === 'explore') return null;



    if (!messages) {
        return (
            <div className="empty-channel">
            <h2>Welcome to {channel ? channel.name + "!": "the channel!"}</h2>
            <p>This is just the beginning. <br /> Be the first to leave a message.</p>
            <form onSubmit={createMessage}>
            <input value={body} onChange={(e) => setBody(e.target.value)}></input>
            <button type="submit">Send Message</button>
             </form>
            </div>
        );
    }



    return (
        <div className='messages-container'>
            {messages?.map((message) => (
                <div>
                    <div className='message-body-div'>{message?.body}</div>
                </div>
            ))}
        <form className="create-message-form" onSubmit={createMessage}>
            <input id="message-input" value={body} onChange={(e) => setBody(e.target.value)}></input>
            <button type="submit">Send Message</button>
        </form>
        </div>
    )
}
