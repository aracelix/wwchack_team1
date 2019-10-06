import React from 'react';
import map from 'lodash/map';
import { useSelector } from 'react-redux';
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
    const feed = useSelector((state) => state.appData.feed);
    // We don't have time stamps so I'm using an index
    // because this is a collection not an array we have to maintain our own index
    let index=0;
    let prevEntry=null;
    const data = map(feed, (data) => {
        console.log(index);
        const newEntry = {
            x: index + 1,
            y: data.c02 || prevEntry.c02, // if for some reason c02 is missing just use the prev data
        };
        prevEntry = data;
        index = index + 1;
        return newEntry;
    });
    return (
        <Box m={2}>
            <Card className="card dashboard-card">
                <CardContent>
                <FlexibleXYPlot>
                        <XAxis />
                        <YAxis />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <VerticalBarSeries data={data} />
                </FlexibleXYPlot>
                </CardContent>
            </Card>
        </Box>
    )
};
export default Chart;


