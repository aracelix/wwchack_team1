import React from 'react';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Box
} from '@material-ui/core';
import {
    ExpandMore as ExpandMoreIcon,
    WarningRounded as WarningIcon,
    CheckRounded as CheckIcon
} from '@material-ui/icons';


const StatusCard = ({ type, errorType, alerts }) => {
    let title, message, messageBg;
    
    switch (errorType) {
        case 'alert':
            title = 'Alert!, Oops looks like there might be some dirty recyclables in your bin!';
            message = 'Your bin is telling me there might be some dirty recyclables inside.';
            messageBg = '#FBBDB8';
            break;
            case 'warning':
            title = 'Warning!';
            message = `Your ${type} levels are nearing the maximum range.`;
            messageBg = '#FFECB2';
            break;
        default:
            title = 'Healthy: All variables are within the normal range. Great job!';
            message = '';
            messageBg = '#329944';
            break;
    }

    const accordionStyle = {
        backgroundColor: messageBg
    };

    return (
        <Box m={2}>
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
        </Box>
    )
}

export default StatusCard;