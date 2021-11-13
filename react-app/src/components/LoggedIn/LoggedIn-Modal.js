import LogoutButton from '../auth/LogoutButton'
import './LoggedIn.css'

function LoggedInModal ({setShowModal, showModal}) {
    
    const handleSave = (e) =>{
     e.preventDefault();        
    }
    return(
        <div  className="user-options">
             <div className='logout'>
                <h2>Overview</h2>
                <span></span>
                <LogoutButton
                className='logout-user'
                />
            </div>
            <div className='form-container'>
            <span className="exit-icon" onClick={()=> setShowModal(false)}><i class="far fa-times-circle"></i></span>
                <form className='edit-user-form'> 
                    <fieldset>
                        <legend>User Options</legend>
                        <div>
                            <label>Change username</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Change Password</label>
                            <input></input>
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input></input>
                        </div>
                        <div>
                            <button 
                            onClick={handleSave}
                            >    
                            Save
                            </button> 
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default LoggedInModal;