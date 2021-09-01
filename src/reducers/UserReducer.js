const initialState = {
    name: '',
    email: '',
    avatar: '', 
    balance: 0.00
}

const UserReducer = (state = initialState, action) => {
    
    switch(action.type){
        case 'SET_DATA':
            return { 
                ...state, 
                name: action.payload.name,
                email: action.payload.email,
                avatar: action.payload.avatar,
                balance: action.payload.balance
            }    
        break
    }
    
    return state;
}

export default UserReducer