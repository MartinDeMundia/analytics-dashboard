import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,   
  } from 'recharts';
import PropTypes from 'prop-types';
import { BarChart, Bar, Cell } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';


const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};
const colors = scaleOrdinal(schemeCategory10).range();
const RevenueChart = (props) => {
    const { dbObject } = props;
    const obj = [];
    for (var x in dbObject) {  
       obj.push({name: dbObject[x].name ,revenue:dbObject[x].revenue});
     }
 return (       
    <div class="card-body py-0 chart_container">
    <BarChart
        width={500}
        height={300}
        data={obj}
        margin={{
            top: 200,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
            {obj.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
        </Bar>
    </BarChart>
</div> 
);
};
export default RevenueChart;