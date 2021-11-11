import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteChannel, fetchChannels,  } from '../../store/channel';

const ChannelEdit = ({channel, serverId, setShowSettings, showSettings}) =>{

const dispatch = useDispatch()
    const [name, setName] = useState(channel.name)
    const [description, setDescription] = useState(channel.description)

    const handleDelete = async () => {
        const result = window.confirm("Are you sure you want to delete?");
        if (result) {
        await dispatch(deleteChannel(channel.id))
        setShowSettings(false)
        }

    }
    const handleSubmit  = async (e) => {
    e.preventDefault()
    const data = {"name": name, "description": description}
    const edit = await fetch(`/api/channels/edit/${channel.id}`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data)
        })

        setShowSettings(false)

    }
    // useEffect(() => {

    // dispatch(fetchChannels(serverId))

    // }, [res])
    return (
        <div className="edit-channel">
              <div className="delete-channel-div">
              <h2>Overview</h2>
             <span></span>
             <button onClick={handleDelete} className="delete-channel">Delete Channel</button>
         </div>

            <div className='form-container'>
             <span className="close-icon" onClick={()=> setShowSettings(false)}><i class="far fa-times-circle"></i></span>

            <form onSubmit={e => handleSubmit(e)} className="edit-channel-form">

                <label>
                <h3>CHANNEL NAME</h3>
                <input
                type="text"
                placeholder="Channel Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                />
                </label>

                <label>
                <h3>DESCRIPTION</h3>
                <textarea
                type="text"
                placeholder="Let everyone know how to use this channel!"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='description'
                required
                />
                <span className='content-length'>{description.length} / 1024</span>
                </label>
                <button type="submit">Save Changes</button>
            </form>
            </div>



        </div>
    )
}

export default ChannelEdit
