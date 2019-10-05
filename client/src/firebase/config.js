import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBPe1PPtjrsouWnFY1A7zy4UC_6AAp_zb0',
    authDomain: 'wwc-hackathon.firebaseapp.com',
    databaseURL: 'https://wwc-hackathon.firebaseio.com',
    projectId: 'wwc-hackathon',
};

firebase.initializeApp(config);

export default firebase