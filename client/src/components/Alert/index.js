import React from 'react';
import { useSelector } from 'react-redux';
import '../../../node_modules/react-vis/dist/style.css';
import StatusCard from '../StatusCard';

const Alert = () => {
    const alerts = useSelector((state) => state.appData.alerts);
    console.log('Alerts', alerts.active)
    return (
        alerts.active ?
        <StatusCard errorType='alert' alerts={alerts.activeAlerts}/>
        : <StatusCard />
    );
};

export default Alert;
