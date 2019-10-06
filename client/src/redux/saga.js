import { put, takeEvery, take, fork, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { filter } from 'lodash';
import firebase from '../firebase/config';


function* fetchDeviceData() {
    try {
        const channel = new eventChannel(emiter => {
            const listener = firebase.database().ref("/").on("value", snapshot => {
                if (snapshot.exists()) {
                    const { alert, feed } = snapshot.val().data;
                    emiter({ data: { alert, feed } || {} });
                } else {
                    emiter({ data: {} });
                }
            });
        
                // #2
            return () => {
              listener.off();
            };
        });
        while (true) {
            const state = yield select((state) => state.appData);
            const { data: { alert, feed } } = yield take(channel);
            const newAlerts = filter(alert, (current, key) =>  !state.alerts.allAlerts[key]);
             if (newAlerts.length > 0) {
                yield put({
                    type: 'FETCH_DATA_SUCCESS',
                    data: {
                        feed,
                        alerts: {
                            active: true,
                            timeStamp: Date.now(),
                            activeAlerts: newAlerts,
                            allAlerts: alert 
                        },
                    },
                });
             } else {
                yield put({
                    type: 'FETCH_DATA_SUCCESS',
                    data: {
                        feed,
                        alerts: {
                            active: false,
                            activeAlerts: {},
                            allAlerts: alert,
                        }
                    }
                });
             }
        }
    } catch (error) {
        yield put({ type:'FETCH_DATA_FAILURE', error, });
    }
}

export default function* appSaga() {
  yield fork(fetchDeviceData)
}