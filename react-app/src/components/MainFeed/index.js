
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

    let messages = useSelector((state) => state?.messages[channelId])
    let channel = useSelector(state => state.channels[serverId]?.find(channel => channelId == channel.id))


    if (!messages) {
        return (
            <div className="empty-channel">
            <h2>Welcome to {channel ? channel.name + "!": "the channel!"}</h2>
            <p>This is just the beginning. <br /> Be the first to leave a message.</p>
            </div>
        );
    }

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

    return (
        <div className='messages-container'>
            {messages?.map((message) => (
                <div>
                    <div>{message?.body}</div>
                </div>
            ))}
            <div>Message 1</div>
            <div>Message 2</div>
            <div>Message 3</div>
        <form onSubmit={createMessage}>
            <input value={body} onChange={(e) => setBody(e.target.value)}></input>
            <button type="submit">Send Message</button>
        </form>
        </div>
    )
}
