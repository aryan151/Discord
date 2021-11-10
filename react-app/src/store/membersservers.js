const ADD_MEMBER = 'members/ADD_MEMBER'

const addOneMember = member => ({
    type: ADD_MEMBER,
    member
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

const initialState = {}
const membersReducer = (state = initialState, action) => {
    switch(action.type) {
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
