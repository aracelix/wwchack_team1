
import { combineReducers } from 'redux';
import { union } from 'lodash';

const initialState = {
    alerts: {
        active: false,
        timeStamp: null,
        activeAlerts: {},
        allAlerts: {},
    },
    feed: {},
    error: null,
  }
  
const appData = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                alerts: action.data.alerts,
                feed: action.data.feed,
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