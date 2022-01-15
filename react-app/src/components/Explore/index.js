import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getServers, addServer } from '../../store/server'
import { Redirect } from 'react-router-dom';
import {createMemberToServer} from '../../store/membersservers'
import { getMyServers } from '../../store/server';
import searchimage from '../video/1490237.jpg'
// import ServerCard from './ServerCard/ServerCard';
import './Explore.css'



function Explore() {

    let history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.session?.user);
    // const [toggleTab, setToggleTab] = useState(1);
    const [toggleTab, setToggleTab] = useState(0);
    const toggle = (index) => { setToggleTab(index) }
    let servers = useSelector(state => Object.values(state.servers));
    const myServers = useSelector(state => state.myServers)

    console.log('my servers set', myServers)

    const userId = useSelector((state) => state.session?.user?.id);
    // const [filteredServers, setFilteredServers] = useState([...servers]);
    const [filteredServers, setFilteredServers] = useState([]);
    const [sortBy, setSortBy] = useState('name A -> Z');
    const [sortOrder, setSortOrder] = useState(-1);   //array sort returns -1 or 1
    const [searchQuery, setSearchQuery] = useState('');
    const [buttonFilter, setbuttonFilter] = useState('All')

    useEffect(() => {

       dispatch(getServers(userId))
    //    dispatch(getMyServers(userId))

    }, [myServers, userId])


    const updateSearchQuery = e => {
        setSearchQuery(e.target.value);
    }
    const updateSortBy = e => {
        setSortBy(e.target.value);
    }
    const toggleSortOrder = e => {
        setSortOrder(sortOrder * -1); // on and off switch since .sort is 1 or -1
    }

    const deleteDuplicates = (...filtered) => {
        let FindDupes = [...filtered[0]];
        for (let i = 1; i < filtered.length; i++) {
            FindDupes = FindDupes.filter(ele => filtered[i].includes(ele));
        }
        return FindDupes;
    }

    const Filtersort = (arr) => {
        switch (sortBy) {
            case 'name A -> Z':
                arr.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? -sortOrder : sortOrder)
                break;
            case 'name Z -> A':
                arr.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -sortOrder : sortOrder)
                break;
            case 'Newest':
                arr.sort((a,b) => a.createdAt < b.createdAt ? -sortOrder : sortOrder)
                break;
            case 'Oldest':
                arr.sort((a,b) => a.createdAt > b.createdAt ? -sortOrder : sortOrder)
                break;
            case 'Most Popular':
                arr.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? -sortOrder : sortOrder)
                break;
            case 'Least Popular':
                arr.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -sortOrder : sortOrder)
                break;
            default:
                break;
        }
    }

     useEffect(() => {


        let Alltags = ['All','Home','Gaming','Music','Videos','Tech','Sports']
        let allFiltered = [];
        let searchFiltered = [...servers];
        let FilteredButtons = [...servers];


        if (searchQuery.length) {
            searchFiltered = servers.filter(server => server.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        else if (buttonFilter === 'All') {
            FilteredButtons = FilteredButtons
        }
        else {
            FilteredButtons = FilteredButtons.filter(server => server.tag === buttonFilter)
        }
        allFiltered.push(FilteredButtons)
        allFiltered.push(searchFiltered);
        let filteredResults = deleteDuplicates(...allFiltered);
        Filtersort(filteredResults)
        setFilteredServers(filteredResults);

    }, [searchQuery, sortBy, sortOrder, buttonFilter])

    const addMemberServer = (serverId) => async () => {
        // e.preventDefault()
        const payload = {
            serverId,
            userId,
        }
        dispatch(createMemberToServer(payload))
        dispatch(getMyServers(userId))
        dispatch(getServers(userId))
        setFilteredServers(servers.filter(server => server.id !== serverId))
        history.push(`/${serverId}`)
    }

    return (
        <>
            <ul className="channels-container">
            <div className="scroll">
                <h1>Discover</h1>
                {/* <li type='button' onClick={() => {setbuttonFilter('All'); toggle(1)}}  className={toggleTab === 1 ? "channelExploreSelect" : "channelExplore"}>
                    <i class="fas fa-globe"></i>
                    <p>All</p>
                </li> */}
                <li  type='button' onClick={() => {setbuttonFilter('Gaming'); toggle(2)}}  className={toggleTab === 2 ? "channelExploreSelect" : "channelExplore"}>
                    <i class="fas fa-headset"></i>
                    <p>Gaming</p>
                </li>
                <li  type='button' onClick={() => {setbuttonFilter('Music'); toggle(3)}}  className={toggleTab === 3 ? "channelExploreSelect" : "channelExplore"}>
                    <i class="fas fa-music"></i>
                    <p>Music</p>
                </li>
                {/* <li  type='button' onClick={() => {setbuttonFilter('Videos'); toggle(4)}}  className={toggleTab === 4 ? "channelExploreSelect" : "channelExplore"}>
                    <i class="fas fa-video"></i>
                    <p>Videos</p>
                </li> */}
                <li  type='button' onClick={() => {setbuttonFilter('Tech'); toggle(5)}}  className={toggleTab === 5 ? "channelExploreSelect" : "channelExplore"}>
                    <i class="fas fa-laptop"></i>
                    <p>Tech</p>
                </li>
                <li  type='button' onClick={() => {setbuttonFilter('Sports'); toggle(6)}}  className={toggleTab === 6 ? "channelExploreSelect" : "channelExplore"}>
                    <i class="fas fa-football-ball"></i>
                    <p>Sports</p>
                </li>
                <li type='button' onClick={() => {setbuttonFilter('Home'); toggle(7)}}  className={toggleTab === 7 ? "channelExploreSelect" : "channelExplore"}>
                    <i class="far fa-compass"></i>
                    <p>Misc.</p>
                </li>
            </div>
            </ul>
        <div className='explore-container'>
        <div className="topPart">
            <div className="topSearch">
                <h3>Up Late? No Problem</h3>
                <h5>From gaming, to music, to learning, there's a place for you.</h5>
                <form className='search-form' onSubmit={(e) => e.preventDefault()}>
                <input
                    className='search-input'
                    value={searchQuery}
                    onChange={updateSearchQuery}
                />
                </form>
             </div>
        </div>
        <div className='sort-dropdown'>
                    <label htmlFor='sort-by'>Sort By:               </label>
                    <select
                    value={sortBy}
                    onChange={updateSortBy}
                    name='sort-by'>
                    <option value='name A -> Z'>{`name A -> Z`}</option>
                    <option value='name Z -> A'>{'name Z -> A'}</option>
                    <option value='Newest'>Newest</option>
                    <option value='Oldest'>Oldest</option>
                    <option value='Most Popular'>Most Popular</option>
                    <option value='Least Popular'>Least Popular</option>
                    </select>
            </div>
         <div className='featured'>
         Click To Join
         </div>
            <div className='ServerDisplay'>
                {toggleTab !== 0 ? filteredServers.slice(0,16).map((server) => (
                    <div className='ServerContainer'>
                        <div className='ServerFront'>
                            <div className='ServerFrontTop' onClick={addMemberServer(server?.id)} >
                                <div className='ServerAddTab'>
                                    <img src={server.avatar} className='CardProfile' alt=''></img>
                                </div>
                            </div>
                            <div className='ServerFrontBottom'>
                                    <h1><span>{server.name}</span> </h1>
                                    <h5> click to add</h5>
                                    <h4>{server.tag}</h4>
                                </div>
                        </div>


                    </div>
                )) :
                servers.slice(0,16).map((server) => (
                    <div className='ServerContainer'>
                        <div className='ServerFront'>
                            <div className='ServerFrontTop' onClick={addMemberServer(server?.id)} >
                                <div className='ServerAddTab'>
                                    <img src={server.avatar} className='CardProfile' alt=''></img>
                                </div>
                            </div>
                            <div className='ServerFrontBottom'>
                                    <h1><span>{server.name}</span> </h1>
                                    <h5> click to add</h5>
                                    <h4>{server.tag}</h4>
                                </div>
                        </div>


                    </div>
                ))

                }
            </div>
        </div>
    </>
    )
}

export default Explore;
