import * as Actions from '../actions';



const initialState = {
    role: 'guest',
    data: {
        'displayName': '',
        'photoURL'   : '',
        // 'email'      : 'alescia.winsley@withinpixels.com',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    }
};

const setUserData = function (state = initialState, action) {
    console.log(action.payload)
    switch ( action.type )
    {
        case Actions.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case Actions.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case Actions.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default setUserData;
