import React from 'react';
import { Card, CardContent,Box } from '@material-ui/core';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    makeVisFlexible,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis
} from 'react-vis';

const Chart = () => {
    const FlexibleXYPlot = makeVisFlexible(XYPlot);
    const data = [{
            x: 0,
            y: 8
        },
        {
            x: 1,
            y: 5
        },
        {
            x: 2,
            y: 4
        },
        {
            x: 3,
            y: 9
        },
        {
            x: 4,
            y: 1
        },
        {
            x: 5,
            y: 7
        },
        {
            x: 6,
            y: 6
        },
        {
            x: 7,
            y: 3
        },
        {
            x: 8,
            y: 2
        },
        {
            x: 9,
            y: 0
        }
    ];

    return (
        <Box m={2}>
            <Card className="card dashboard-card">
                <CardContent>
                <FlexibleXYPlot>
                        <XAxis />
                        <YAxis / >
                        <VerticalGridLines />
                        <HorizontalGridLines / >
                        <VerticalBarSeries data={data} />
                </FlexibleXYPlot>
                </CardContent>
            </Card>
        </Box>
    )
};
export default Chart;


