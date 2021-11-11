const ADD_MEMBER = 'members/ADD_MEMBER'
const GET_MEMBERS = 'members/GET_MEMBERS'

const addOneMember = member => ({
    type: ADD_MEMBER,
    member
})

const getMembers = members => ({
    type: GET_MEMBERS,
    members
})

export const createMemberToServer = payload => async dispatch => {
    const response = await fetch(`/api/members/`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ ...payload})
    })
    if (response.ok) {
        const member = await response.json()
        dispatch(addOneMember(member))
    }
}

export const getServerMembers = serverId => async dispatch => {
    const response = await fetch(`/api/members/${serverId}`)
    if (response.ok) {
        const members = await response.json()
        dispatch(getMembers(members))
    }
}

const initialState = {}
const membersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_MEMBERS: {
            const allMembers = {};
            action.members.members.forEach((member )=> {
                allMembers[member['id']] = member
            });
            return {
                ...allMembers,
                // ...state,
                // list: action.list.servers,
            }
        }
        case ADD_MEMBER: {
            const newState = {
                ...state,
                [action.member['userId']]: action.member
            }
            return newState
        }
        default:
        return state;
    }

}

export default membersReducer
