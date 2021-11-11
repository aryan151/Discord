import LogoutButton from "../auth/LogoutButton"
import { useSelector } from "react-redux"
import './LoggedIn.css'

function LoggedIn () {
    const user = useSelector(state => state.session?.user)
    return (
        <div className="loggedin-container">
            <div className="left-loggedin">
                <div className="user-avatar"style={{backgroundImage: `url(${user?.avatar})`}}></div>
                <div>{user?.username}</div>
            </div>
            <LogoutButton />
        </div>
    )
}

export default LoggedIn
