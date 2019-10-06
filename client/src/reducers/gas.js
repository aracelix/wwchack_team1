import { FETCH_GAS } from '../actions/gas';

const initialState = {
    value: null,
};

const gasReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_GAS:
            return { ...state, value: payload }
        default:
            return state;
    }
};

export default gasReducer;