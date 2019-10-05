import React, { Component } from 'react';
import firebase from './firebase/config';

export default class App extends Component {
    constructor(props) {
        super(props);
        // firebase.initializeApp();
    }
    componentDidMount() {
        console.log(firebase.auth().currentUser);
        const database = firebase.database();
        database.ref('/').once('value').then(snapshot => console.log(snapshot.val().message));
    }
    render() {
        return <h1>Hi</h1>
    }
}