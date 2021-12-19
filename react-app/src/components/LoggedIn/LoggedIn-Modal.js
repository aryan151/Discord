import LogoutButton from '../auth/LogoutButton'
import './LoggedIn.css'

function LoggedInModal ({setShowModal, showModal}) {

    const handleSave = (e) =>{
     e.preventDefault();
    }
    return(
        <div  className="user-options">
            {/* <i class="far fa-times-circle"></i> */}
             <div className="user-logout">
                <LogoutButton/>
            </div>
            <div className="cancel user-logout" onClick={()=> setShowModal(false)}>
                Cancel
            </div>
        </div>
    )
}

export default LoggedInModal;
