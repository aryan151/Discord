import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getServerMembers } from "../../store/membersservers";
import './ServerMembersFeed.css'



function ServerMembersFeed() {

    const dispatch = useDispatch()

    const params = useParams()
    let { serverId } = params
    const userId = useSelector((state) => state.session?.user?.id) 
    const members = useSelector((state) => Object.values(state.members).filter((member) => member.id !== userId))
    console.log(members)

    useEffect(() => {
        dispatch(getServerMembers(serverId))
    }, [dispatch, serverId])

    return (
        <div>
            <h2>Server Members</h2>
            {members ? members.map((member) => (
                <div className="member-div">
                    <div className="user-avatar" style={{backgroundImage: `url(${member?.avatar})`}}></div>
                    <span className="member-name">{member?.username}</span>
                </div>
            )) : <div>No Members in this Server</div>}
        </div>
    )

}

export default ServerMembersFeed;
