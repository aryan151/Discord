import LogoutButton from '../auth/LogoutButton'


function LoggedInModal () {
    
    const handleSave = (e) =>{
     e.preventDefault();
        
    }
    return(
        <div>
        <form >
            <fieldset>
                <legend>User Options</legend>
                  <div>
                      <label>Change username</label>
                      <input></input>
                  </div>
                  <div>
                        <button 
                        
                        >    
                        Save
                        </button> 
                  </div>
                  <div>
                      <LogoutButton />
                  </div>
            </fieldset>
        </form>
    </div>
    )
}

export default LoggedInModal;