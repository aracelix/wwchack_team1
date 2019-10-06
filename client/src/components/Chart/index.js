import React from 'react';
import reduce from 'lodash/reduce';
import slice from 'lodash/slice';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    makeVisFlexible,
    VerticalBarSeries,
    VerticalGridLines,
    HorizontalGridLines,
    XAxis,
    YAxis,
    DiscreteColorLegend,
    Crosshair
} from 'react-vis';

const Chart = () => {
    const feed = useSelector((state) => state.appData.feed);
    const FlexibleXYPlot = makeVisFlexible(XYPlot);

    let index = 0;
    const data = reduce(feed, (acc, measurement) => {
            forEach(measurement, (value, key) => {
                const coord = { x: index, y: value };
                (acc[key] || (acc[key] = [])).push(coord);
            })
            index = index + 1;
            return acc;
        }, {});

    const getLast20 = (arr) => slice(arr, arr.length - 20, arr.length);

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
            <Card className="card dashboard-card" style={{paddingTop: '3vh'}}>
                <CardContent>
                {!isEmpty(feed) && (
                    <FlexibleXYPlot>
                            <XAxis />
                            <YAxis />
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <DiscreteColorLegend 
                                items={legendItems} 
                                orientation="horizontal"
                                style={{position: 'absolute', left: '40px', top: '-2.5vh' }} />
                            <VerticalBarSeries color="#f79824" data={getLast20(data.c02)} />
                            <VerticalBarSeries color="#ffd966" data={getLast20(data.humidity)} />
                            <VerticalBarSeries color="#33a1fd" data={getLast20(data.weight)} />
                    </FlexibleXYPlot>
                    )}
                </CardContent>
            </Card>
        </Box>
    )
};
export default Chart;


