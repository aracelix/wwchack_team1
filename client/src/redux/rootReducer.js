
import { combineReducers } from 'redux';

const initialState = {
    data: [],
    error: null,
  }
  
const appData = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: [...state.data, ...action.data],
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

const rootReducer = combineReducers({
    appData
});

export default rootReducer;