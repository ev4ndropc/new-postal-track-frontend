const initialState = {
    name: '',
    email: '',
    avatar: '',
    whatsapp: '',
    storeName: null,
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
                whatsapp: action.payload.whatsapp,
                balance: action.payload.balance,
                storeName: action.payload.storeName
            }
        break
        case 'SET_STORE_NAME':
          return {
            ...state,
            storeName: action.payload.storeName
          }
        break
    }

    return state;
}

export default UserReducer
