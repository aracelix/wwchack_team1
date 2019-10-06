import React, { Component } from 'react';
import firebase from './firebase/config';

import Chart from './components/Chart';
import './styles/index.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        // firebase.initializeApp();
    }
    
    componentDidMount() {
        console.log(firebase.auth().currentUser);
        const database = firebase.database();
        database.ref('/').once('value').then(snapshot => console.log(snapshot.val().data)).catch(e => console.log(e));
    }
    
    render() {
        return (
            <div>
                <Chart />
            </div>
        );
    }
}