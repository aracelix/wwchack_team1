import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/WarningRounded';
import CheckIcon from '@material-ui/icons/CheckRounded';



const StatusCard = ({ type, errorType = 'warning' }) => {
    let title, message, messageBg;

    switch (errorType) {
        case 'alert':
            title = 'Alert!';
            message = `Your ${type} levels have the normal range.`;
            messageBg = '#FBBDB8';
            break;
            case 'warning':
            title = 'Warning!';
            message = `Your ${type} levels are nearing the maximum range.`;
            messageBg = '#FFECB2';
            break;
        default:
            title = 'Healthy';
            message = 'All variables are within the normal range. Great job!';
            messageBg = null;
            break;
    }

    const accordionStyle = {
        margin: '0 15px',
        backgroundColor: messageBg
    };

    return (
        <ExpansionPanel style={accordionStyle}>
            <ExpansionPanelSummary 
                expandIcon={<ExpandMoreIcon />}
                aria-controls="status-panel-content"
                id="status-panel-header">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {errorType ? <WarningIcon /> : <CheckIcon/>}
                        &nbsp;Status: <b>&nbsp;{title}</b>
                    </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {message}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default StatusCard;