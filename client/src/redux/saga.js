import { put, takeEvery } from 'redux-saga/effects'
import firebase from '../firebase/config';


function* fetchDeviceData() {
  const database = firebase.database();
  database.ref('/')
      .on('value', snapshot => {
          if (snapshot.exists()) {
              console.log(snapshot.val().data)
          }
      })
}

export default function* appSaga() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchDeviceData)
}