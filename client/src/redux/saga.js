import { put, takeEvery, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { filter } from 'lodash';
import firebase from '../firebase/config';


function* fetchDeviceData() {
    try {
        const channel = new eventChannel(emiter => {
            const listener = firebase.database().ref("/").on("value", snapshot => {
                if (snapshot.exists()) {
                    const { alert, feed } = snapshot.val().data;
                    emiter({ data: { alert, feed } || [] });
                } else {
                    emiter({ data: [] });
                }
            });
        
                // #2
            return () => {
              listener.off();
            };
        });
        while (true) {
            const { data } = yield take(channel);
                // #4
           yield put({ type: 'FETCH_DATA_SUCCESS', data, });
        }
    } catch (error) {
        yield put({ type:'FETCH_DATA_FAILURE', error, });
    }
}

export default function* appSaga() {
  yield fork(fetchDeviceData)
}