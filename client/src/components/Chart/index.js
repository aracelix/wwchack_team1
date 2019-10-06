import React from 'react';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import { useSelector } from 'react-redux';
import { Card, CardContent, Box } from '@material-ui/core';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    makeVisFlexible,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    DiscreteColorLegend
} from 'react-vis';

const Chart = () => {
    const FlexibleXYPlot = makeVisFlexible(XYPlot);
    const feed = useSelector((state) => state.appData.feed);

    let index = 0;
    const data = reduce(feed, (acc, measurement) => {
        map(measurement, (value, key) => {
            const coord = { x: index, y: value };
            (acc[key] || (acc[key] = [])).push(coord);
        })
        index = index + 1;
        return acc;
    }, {});

    const legendItems = [{
        title: "CO2",
        color: "#f79824"
    }, {
        title: "Humidity",
        color: "#ffd966"
    }, {
        title: "Weight",
        color: "#33a1fd"
    }];

    return (
        <Box m={2}>
            <Card className="card dashboard-card">
                <CardContent>
                <FlexibleXYPlot stackBy="y">
                        <XAxis />
                        <YAxis />
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <DiscreteColorLegend items={legendItems} style={{position: 'absolute', left: '50px', top: '10px'}} />
                        <VerticalBarSeries cluster="c02" color="#f79824" data={data.c02} />
                        <VerticalBarSeries cluster="humidity" color="#ffd966" data={data.humidity} />
                        <VerticalBarSeries cluster="weight" color="#33a1fd" data={data.weight} />
                </FlexibleXYPlot>
                </CardContent>
            </Card>
        </Box>
    )
};
export default Chart;


