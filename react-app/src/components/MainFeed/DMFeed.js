import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import { createDm, fetchDms } from '../../store/dmMessages'
import MessageBox from './MessageBox'
import './DmFeed.css'

const DMFeed = ({dmuser}) => {
  const user = useSelector(state => state.session.user)
  const [messageError, setMessageError] = useState('');
  const [body, setBody] = useState('');
  // const [dms, setDms] = useState([]);
  // const [imgUrl, setImgUrl] = useState('')
  const dispatch = useDispatch()

  // useEffect(() => {
  //   // fetch(`/api/dms/${user.id}/${dmuser?.id}`).then(res => res.json()).then(json => setDms([...json['dms']]))
  //   // console.log(dmuser, user)
  //   fetchDms(user.id)
  // }, [dmuser])
  const dms = useSelector(state => state.dms[dmuser.id])

  const handleDm = async (e) => {
    e.preventDefault()
  //   const payload = {
  //     // ...(imgUrl.length && {imgUrl: imgUrl})
  // }
     const payload = {
        body,
        senderId: user.id,
        dm_server_Id: dmuser.id,
        username: dmuser.username,
        imageUrl: dmuser.avatar
     }
    dispatch(createDm(payload))

    setBody("")
      return
  }

  const handleEnter = (e) => {
    if (body.length > 2000 && e.key === "Enter") {
        e.preventDefault();
        setMessageError('Message cannot exceed 2000 characters.');
        return;
    }

    if (/^\s*$/.test(body)) {
        return;
    }
    if (e.key === "Enter") {
        handleDm(e);
        setMessageError('')
    }
}

  return (

    <div className='dm-feed-container'>

      <div className='dm-message-container'>
        {dms && dms.map(dm =>
        <div className='dm-message'>
          <div className='live-chat-avatar-div' style={{backgroundImage: `url(${dm?.imageUrl})`}}> </div>
          <div className='inner-dm-message'>
            <div className='dm-date-time'>
            <h3>{dm.username}</h3>
            <div className='decorated dm'>
                <span>
                    {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(dm?.createdAt))} {new Date(dm?.createdAt).getDate()}, 2021
                </span>
              </div>
            </div>
          <div className='dm-body'>{dm.body}</div>
          </div>
        </div>
          )}
      </div>
        <div className="channel-content-chat-input-container dm-input">
                    <form className="new-message-form" onSubmit={(e) => handleDm(e)} >
                        <label className="new-message-label">
                            <textarea
                                type="text"
                                className="new-message-input"
                                value={body}
                                onChange={(e)=> setBody(e.target.value)}
                                onKeyDown={handleEnter}
                                // ref={messageRef}
                                placeholder={`Message #${dmuser.username}`}
                            ></textarea>

                            { messageError &&
                                <p className="message-error">{messageError}</p>
                            }
                        </label>
                    </form>
                </div>

    </div>
  )
}

export default DMFeed
