<>
<Route path="/servers/:serverId" component={ ServersSettingModal } />
<Route exact path="/servers/:serverId/:channelId" component={ ChannelsControlModal }/>
<Route path="/servers" component={ UserControlModal } />  
<div className="Dashboard Wrap">
    {/* <ServersNavBar /> */}
    <div className="Dashboard content wrapper">
            <div className="sidebar-wrapper">
                <nav className="channels Navbar">
                    <div className="Server Channels">
                        <Route path="/channels"/>
                    </div>
                    <div className="Channels">
                        <Switch>
                            <Route path="/servers/@me" >
                                {/* <FriendChannels /> */}
                            </Route>
                            <Route path="/servers/:channelId/" >
                                {/* <ServerChannels/> */}
                            </Route>
                        </Switch>
                    </div>
                </nav>
                <div className="UserTools">
                    {/* <UserSettingsNavBar /> */}
                </div>
            </div>

            <div className="Messages">
                {/* <MessageHeaderBar/> */}
                <div className="All Messages">
                        <Switch>
                            <Route exact path="/servers/@me/:DirectMessageId" >
                                {/* <DirectMessageContainer/> */}
                            </Route>
                            <Route exact path="/servers/:serverId/:channelId" >
                                {/* <MessageContainer /> */}
                            </Route>
                        </Switch>
                </div>
                <div className="Members">
                    <Route path="/servers/:serverId"/>
                    <div className="Server Members">
                        {/* <ServerMembersinfo /> */}
                    </div>
                </div>
            </div>
    </div>
</div>
</>