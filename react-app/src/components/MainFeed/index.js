
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import '../Dashboard/dashboard.css'
import { getMessages, createOneMessage } from '../../store/message';

export const MainFeed = () => {

    const params = useParams()
    let {serverId, channelId} = params
    const [body, setBody] = useState('')
    let messages = useSelector((state) => state?.messages[channelId])
    const userId = useSelector((state) => state.session?.user?.id);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMessages(channelId))
    }, [dispatch, channelId, serverId])



    if (!messages) {
        return null;
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
