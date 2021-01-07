import React from 'react';
import { Result, Button, Row, Col } from 'antd';


const NoAdmin = (props) => {
	return (
		<>
			<Row justify="center">
				<Col>
					<Result
						status="error"
						title="Application Not Initialized!"
						subTitle="No admin account specified! Press the button below to set the current account as the admin or change your account & refresh the page"
						extra={[
							<Button type="primary" key="console" onClick={() => props.click(props.account)}>
								Continue as Admin
							</Button>,
						]}
					/>
				</Col>
			</Row>
		</>
	);
};

export default NoAdmin;