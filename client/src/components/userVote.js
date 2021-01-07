/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Radio, Row, Col, Divider, Button, Typography } from 'antd';
import VoteChart from './voteChart';

const { Title } = Typography;

const UserVote = (props) => {
	let hideVote = false;
	if (props.voted) {
		hideVote = true;
	}
	const names = [];
	const votes = [];
	const data = [];
	props.names.forEach((element) => {
		names.push(element.name);
		votes.push(element.voteCount);
		if (element.voteCount != 0) {
			const temp = {
				'id': element.name,
				'label': element.name,
				'value': element.voteCount,
			};
			data.push(temp);
		}
	});
	const content = names.map((element, index) =>
		<Radio.Button key={element + index.toString()} value={index + 1} count={votes[index]}>{element}</Radio.Button>,
	);
	const [disabled, setDisabled] = useState(true);
	const [val, setVal] = useState(null);
	const select = (e) => {
		setVal(e.target.value);
		if (disabled === true) {
			setDisabled(false);
		}
	};
	const castVote = () => {
		setDisabled(true);
		console.log(val);
		props.vote(val);
	};

	return (
		<div style={{ height: '400px' }}>
			<Divider />
			<VoteChart data={data} />
			<Row justify="center" gutter={[16, 16]}>
				<Col>
					<Title strong level={5} hidden={!hideVote}>You have already voted!</Title>
				</Col>
			</Row>
			<div hidden={hideVote}>
				<Row justify="center" gutter={[16, 16]}>
					<Col>
						<Radio.Group size="large" onChange={select}>
							{content}
						</Radio.Group>
					</Col>
				</Row>
				<Row justify="center" gutter={[16, 16]}>
					<Col>
						<Button type="primary" disabled={disabled} onClick={castVote}>Vote!</Button>
					</Col>
				</Row>
			</div>
			<Divider />
		</div>
	);
};

export default UserVote;