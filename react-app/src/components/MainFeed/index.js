
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import '../Dashboard/dashboard.css'
import { getMessages } from '../../store/message';

export const MainFeed = () => {

    const params = useParams()
    let {serverId, channelId} = params

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMessages(channelId))
    }, [dispatch, channelId, serverId])

    let messages = useSelector((state) => state?.messages[channelId])
    console.log(messages)

    if (!messages) {
        return null;
    }

    return (
        <div className='messages-container'>
            {messages?.map((message) => (
                <div>
                    <div>{}</div>
                    <div>{message?.body}</div>
                </div>
            ))}
            <div>Message 1</div>
            <div>Message 2</div>
            <div>Message 3</div>
        </div>
    )
}
