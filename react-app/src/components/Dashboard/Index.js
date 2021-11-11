import React from 'react'
import Server from '../Server'
import Channels from '../Channels/Index'
import './dashboard.css'
import { MainFeed } from '../MainFeed'
import ServerMembersFeed from '../ServerMembersFeed'


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Server />
      <Channels />
      <MainFeed />
      <ServerMembersFeed />
      {/* <Members / > */}
    </div>
  )
}

export default Dashboard
