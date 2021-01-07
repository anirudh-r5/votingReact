/* eslint-disable react/prop-types */
import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const VoteChart = (props) => {
	const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
		let total = 0;
		dataWithArc.forEach(datum => {
			const val = parseInt(datum.value);
			total += val;
		});
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize: '1vw',
					fontWeight: '600',
				}}
			>
				Total Votes: {total}
			</text>
		);
	};
	return (
		<ResponsivePie
			data={props.data}
			animate={true}
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			sortByValue={true}
			innerRadius={0.75}
			padAngle={2}
			cornerRadius={0}
			colors={{ scheme: 'pastel1' }}
			borderWidth={1}
			borderColor={{ from: 'color', modifiers: [['darker', 2]] }}
			radialLabelsTextColor="#333333"
			radialLabelsLinkOffset={-2}
			radialLabelsLinkColor={{ from: 'color' }}
			sliceLabelsSkipAngle={10}
			sliceLabelsTextColor="#333333"
			layers={['slices', 'sliceLabels', 'radialLabels', 'legends', CenteredMetric]}
		/>
	);
};

export default VoteChart;