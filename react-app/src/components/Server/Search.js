import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import './HomeServer.css'

const Search = ({addUser, setDmUser }) => {
  const [term, setTerm] = useState("")
  const [results, setResults] = useState([])
  const currentUser = useSelector(state => state.session.user)
  // const [isLoaded, setIsLoaded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  // const history = useHistory();

  useEffect(()=> {
    if(term.length > 0) {
      // setIsLoaded(false);
      setShowSearch(true);
      fetch(`/api/users/search/${term}`).then(res => res.json()).then(json => {setResults(json.users.filter(user => user.username !== currentUser.username )); console.log(json)}).catch(e => console.log(e));
      // setIsLoaded(true);
    } else (setResults(""));

  }, [term])

  const handleSearch = (e) => {
    e.preventDefault();
    setTerm(e.target.value);
  }

  // useEffect(() => {
  //   if (!showSearch) return;
  //   const closeModal = () => {
  //     setShowSearch(false);
  //     setTerm('');
  //   };
  //   document.addEventListener('click', closeModal);
  //   return () => document.removeEventListener("click", closeModal);
  // }, [showSearch]);


  return (
    <div className='search-container' onClick={(e)=> e.stopPropagation()}>
      <form className='search-bar' autoComplete="off">

        <input type="search"
           placeholder='Start Up A Conversation' value={term} onChange={handleSearch} />

      

        { !!results.length && results?.map(user => (

        <div  className='search-results-div' onClick={()=> { addUser(user); setDmUser(user) }}>

          <img src={user.avatar}></img>
          <p>{user.username}</p>
          </div>

        ))}

      </form>
    </div>
  )
}

export default Search;
