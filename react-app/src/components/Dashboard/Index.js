import React from 'react'
import { useEffect, useState } from 'react'
import Server from '../Server'
import Channels from '../Channels/Index'
import './dashboard.css'
import { MainFeed } from '../MainFeed'
import ServerMembersFeed from '../ServerMembersFeed'
import NavBar from '../NavBar'
import { useParams } from 'react-router'

const Dashboard = () => {
  // const [showServerMembers, setShowSeverMembers] = useState(true)
  const params = useParams()
  let serverId = params?.serverId


  return (
    <>
    {/* <NavBar /> */}
    <div className="dashboard-container">
      <Server />
      <Channels />
      <MainFeed />
      {(serverId == 'explore' ||  window.location.href.includes('home')) ? null  : <ServerMembersFeed />}
      {/* <Members / > */}
    </div>
    </>
  )
}

export default Dashboard
