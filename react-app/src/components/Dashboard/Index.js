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
    </div>
  )
}

export default Dashboard
