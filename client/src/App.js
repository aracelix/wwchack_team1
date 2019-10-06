import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux';

import Chart from './components/Chart';
import './styles/index.css';
import appDataReducer from './redux/rootReducer';
import appSaga from './redux/saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appDataReducer, applyMiddleware(sagaMiddleware));


const InitApp = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA_REQUEST'});
    },[]);
    return (
        <Chart/ >
    );
};

const App = () => <Provider store={store}><InitApp /></Provider>;

sagaMiddleware.run(appSaga);

export default App;
