


const initialState = {
    data: [],
    error: null,
  }
  
const appData = (state, action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return initialState
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: state.data.concat(action.data),
            }
        case 'FETCH_DATA_ERROR':
            return {
                ...state,
                error: action.error,
            }
        default:
            return state
    }
};

export default appData;