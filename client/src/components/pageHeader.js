import React from 'react';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

const PageHeader = () => {
	return (
		<>
			<Row justify="center">
				<Col>
					<Title strong>The Elector</Title>
				</Col>
			</Row>
			<Row justify="center">
				<Col>
					<Title level={3}>A blockchain based election DApp</Title>
				</Col>
			</Row>
		</>
	);
};

export default PageHeader;