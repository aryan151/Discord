import React from 'react'
import Server from '../Server'
import Channels from '../Channels/Index'
import './dashboard.css'
import { MainFeed } from '../MainFeed'


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Server />
      <Channels />
      <MainFeed />
      {/* <Members / > */}
    </div>
  )
}

export default Dashboard
