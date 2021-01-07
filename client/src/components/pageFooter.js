/* eslint-disable react/prop-types */
import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

const PageFooter = (props) => {
	return (
		<Row justify="center">
			<Col>
				<Title strong level={5}>Logged in as: {props.account}</Title>
			</Col>
		</Row>
	);
};

export default PageFooter;