import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import data from 'emoji-mart/data/google.json'
import 'emoji-mart/css/emoji-mart.css'
import { createDm, fetchDms } from '../../store/dmMessages'
import MessageBox from './MessageBox'
import './DmFeed.css'


import { io } from 'socket.io-client';
let socket;

const DMFeed = ({dmuser}) => {
  const user = useSelector(state => state.session.user)
  const [messageError, setMessageError] = useState('');
  const [body, setBody] = useState('');
  const [chatmessages, setChatMessages] = useState([]);
  // const [dms, setDms] = useState([]);
  // const [imgUrl, setImgUrl] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setChatMessages([])
  }, [dmuser])


  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    socket.on('connect', function() {
        socket.emit('join', 5 )
    })

    socket.on("chat", (data) => {
        console.log('recieved socket message!!', data)
        let chat = data.split('@')[0]
        let user = data.split('@')[1]
        let avatar = data.split('@')[2]
        let createdAt = Date.now()
        // setChatMessages((message) => [data, ...message])
        setChatMessages((message) => [...message, [chat, user, avatar, createdAt]])
    })
    // when component unmounts, disconnect
    return (() => {
        socket.disconnect()
    })
}, [dispatch, chatmessages])

const convertTime = function(oldTime){
  console.log(oldTime)
  let newTime = oldTime.split(' ')[4]
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

  // useEffect(() => {
  //   // fetch(`/api/dms/${user.id}/${dmuser?.id}`).then(res => res.json()).then(json => setDms([...json['dms']]))
  //   // console.log(dmuser, user)
  //   fetchDms(user.id)
  // }, [dmuser])
  const dms = useSelector(state => state.dms[dmuser.id])

  useEffect(() => {
    scrollToBottom()
   }, [])

  const handleDm = async (e) => {
    e.preventDefault()
  //   const payload = {
  //     // ...(imgUrl.length && {imgUrl: imgUrl})
  // }
     const payload = {
        body,
        senderId: user.id,
        dm_server_Id: dmuser.id,
        username: user.username,
        imageUrl: user.avatar
     }
    dispatch(createDm(payload))
    socket.emit("chat", { 'msg': `${body}@${user?.username}@${user?.avatar}`, 'channelId': 5, 'user': user?.username})
     scrollToBottom()
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

function scrollToBottom () {
  var div = document.querySelector('.dm-message-container');

  if (div) div.scrollTop = div.scrollHeight - div.clientHeight;

}
  return (

    <div className='dm-feed-container'>

      <div className='dm-message-container'>
      <div className="dm-history">
          < div className='avatar' style={{backgroundImage: `url(${dmuser.avatar})` }} ></div>
          <h2>{dmuser.username}</h2>
          <h4>This is the beginning of your direct message history with @{dmuser.username}</h4>

        </div>
        {dms && dms.map(dm =>
        <div className='dm-message'>
          <div className='live-chat-avatar-div' style={{backgroundImage: `url(${dm?.imageUrl})`}}> </div>
          <div className='inner-dm-message'>
            <div className='dm-date-time'>
            <h3>{dm.username}</h3>
            <div className='decorated'>
                <span>
                    {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(dm?.createdAt))} {new Date(dm?.createdAt).getDate()}, 2021
                </span>
              </div>
            </div>
          <div className='dm-body'>{dm.body}</div>
          </div>
        </div>
          )}
          <div className="Main-Message-content">

          {chatmessages.map((message) => (
          <div className="live-chat-div">
              <div className='decorated'>
              <span>
                  {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(message[3]))} {new Date(message[3]).getDate()}, 2021
              </span>
              </div>

              <div className="username-message-container">

                  <div className='live-chat-avatar-div' style={{backgroundImage: `url(${message[2]})`}}></div>
                  <div>

              <div className="date-div"><span className='username-div-message'>{message[1]}</span><span className='time-message'>{isSameDay(message[3]) === true ? "Today at  " : ''}{convertTime(new Date(message[3]).toString())}</span></div>
              <div className="channel-content-message">{message[0]}</div>

          </div>
                      {/* <div className="channel-content-message">
                          {`${message[1]}:${message[0]}`}
                      </div> */}
              </div>

          </div>
              ))}

          </div>
      </div>
        <div className="channel-content-chat-input-container dm-input">
                    <form className="new-dm-form" onSubmit={(e) => handleDm(e)} >
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
