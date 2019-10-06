
import { combineReducers } from 'redux';
import { union } from 'lodash';

const initialState = {
    data: [],
    error: null,
  }
  
const appData = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            const newData = union(state.data, action.data);
            return {
                ...state,
                data: newData,
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