import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from 'redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';

import NavBar from './components/NavBar';
import Chart from './components/Chart';
import Alert from './components/Alert';
import StatusCard from './components/StatusCard';
import './styles/index.css';
import rootReducer from './redux/rootReducer';
import appSaga from './redux/saga';

const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#f3f3f3',
      },
      secondary: {
        main: '#ffd966',
      },
  },
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(appSaga);

const InitApp = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'FETCH_DATA_REQUEST'});
    },[]);
    return (
        <div>
            <NavBar />
            {!isMobile ? <Box p={3.5}/> : null}
            <Alert/>
            <Chart/>
        </div>
    );
};

const App = () => <Provider store={store}><ThemeProvider theme={theme}><InitApp /></ThemeProvider></Provider>;


export default App;
