import React from 'react'
import { useState, useEffect} from 'react';
import Search from './Search'
import './HomeServer.css'
import DMFeed from '../MainFeed/DMFeed';
import { fetchDms } from '../../store/dmMessages';
import { useSelector, useDispatch } from 'react-redux';
const HomeServer = () => {

  const [showModal, setShowModal] = useState(false);
  const [dmUsers, setDmUsers] = useState([]);
  const [showClose, setShowClose] = useState(false)
  const [current, setCurrent] = useState()
  const [dmUser, setDmUser] = useState(null)
  const [count, setCount] = useState(0)

  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const history = useSelector(state => Object.keys(state.dms))

  useEffect(() => {
    if (!showModal) return;
    const closeModal = () => {
      setShowModal(false);
    };
    document.addEventListener('click', closeModal);
    return () => document.removeEventListener("click", closeModal);
  }, [showModal]);

  const handleClick = () => {
    setShowModal(true)
  }

  useEffect(() => {
    if (history.length && !dmUsers.length && count == 0){
      let urlString = ""
      history.map((num, i) => {
        if (i == 0) {
        urlString += num;
        }
        else {
          urlString += `-${num}`
        }
      })
      fetch(`/api/users/dms/` + urlString).then(res => res.json())
      .then(json =>  {
        setDmUsers(json.users);
        console.log(json.users, urlString)
        setDmUser(json.users[0])
      })
      setCount(prev => prev + 1);
    }
  }, [history])

  useEffect(() => {
    dispatch(fetchDms(user.id))
  }, [])

  // useEffect(() => {
  //   if (dmUsers.length && count <= 1){
  //     setDmUser(dmUsers[0]);
  //   }
  // }, [dmUsers, count, ])


  const handleRemove = (user) => {
    setDmUsers(dmUsers.filter(each => user.username !== each.username))

  }

  const addUser = (user) => {
    // if ( !dmUsers.some(x => x.username === user.username) ){
    //   setDmUsers(prev => [user, ...prev])
    //   }
    if (!dmUsers.length){
      setDmUsers([user])
      setShowModal(false);
      return;
    }
    for (let i = 0; i < dmUsers.length; i++){
      if(dmUsers[i].username == user.username) {
        setShowModal(false);
        return
      }
    }
    setDmUsers(prev => [user, ...prev])
    setShowModal(false);
  }



  return (
    <>
    <div className='dm-wrapper'>
      <span className='start-conversation'>
        <p id="search-users" onClick={handleClick}>Start a conversation</p>
      </span>
      <div className='dm-container'>
        <h3>Direct Messages</h3>

        {dmUsers?.map( (user, i) =>

         <div className='dm-icon'
         onClick={()=> setDmUser(user)}
         onMouseEnter={()=> {setShowClose(true); setCurrent(i)}} onMouseLeave={() => {setShowClose(false); setCurrent(i)}}>
          <img src={user.avatar} className='dm-links'></img>
          {user.online ?  <span className='is-online'><i class="fas fa-circle"></i></span> : <span className='is-offline'><i class="fas fa-circle"></i></span>}
          <p style={{color: showClose && i == current ? 'white' : '#a2a3a6'}}>{user.username}</p>
            {showClose && current == i &&
            <span className="close-dm" style={{color: "rgb(187, 185, 185)"}} onClick={() =>  handleRemove(user)}><i class="fas fa-times"></i></span>}
         </div>

        )

        }
      </div>

      <div className='search-wrapper' >
          { showModal && <Search addUser={addUser} dmUsers={dmUsers} setDmUser={setDmUser} setShowModal={setShowModal}/>}
      </div>
    </div>
      {dmUser ? <DMFeed dmuser={dmUser} /> : <img className='wumbus' src='https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5e6ff2eb37d0440006bc9fe7%2FDiscord%2F960x0.jpg%3Ffit%3Dscale'></img>}

    </>
  )
}

export default HomeServer
