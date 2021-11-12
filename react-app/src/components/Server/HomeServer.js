import React from 'react'
import { useState, useEffect} from 'react';
import Search from './Search'
import './HomeServer.css'

const HomeServer = () => {

  const [showModal, setShowModal] = useState(false);
  const [dmUsers, setDmUsers] = useState([]);

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

  const addUser = (user) => {
    setDmUsers(prev => {
     return Array.from(new Set([user, ...prev]))})
  }

  return (
    <div className='dm-wrapper'>
      <span className='start-conversation'>
        <p onClick={handleClick}>Find or start a conversation</p>
      </span>
      <div className='dm-container'>
        <h3>Direct Messages</h3>
        {dmUsers.map(user =>
        <img src={user.avatar} className='dm-links'></img>
        )}
      </div>

      <div className='search-wrapper' >
          { showModal && <Search addUser={addUser} setShowModal={setShowModal}/>}
      </div>
    </div>
  )
}

export default HomeServer
