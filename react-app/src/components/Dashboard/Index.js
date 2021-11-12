import React from 'react'
import Server from '../Server'
import Channels from '../Channels/Index'
import './dashboard.css'
import { MainFeed } from '../MainFeed'
import ServerMembersFeed from '../ServerMembersFeed'
import { useParams } from 'react-router'

const Dashboard = () => {
  const params = useParams()
  let serverId = params?.serverId  

  return ( 
    <>
    <div className="dashboard-container">
      <Server />
      <Channels />
      <MainFeed />
      {serverId != 'explore' ? <ServerMembersFeed /> : null}
      {/* <Members / > */}
    </div>
    </>
  )
}

export default Dashboard
