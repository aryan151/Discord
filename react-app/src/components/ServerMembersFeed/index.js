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


   const countMembers = () => {
       let count = 0;
       for (let i = 0; i < members.length; i++) {
           count += 1;
       }
       return count
   }

    useEffect(() => {
        dispatch(getServerMembers(serverId))
    }, [dispatch, serverId])

    return (
        <div className="server-members-div">
            <h2 id="server-members-title">MEMBERS - {countMembers()}</h2>
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
