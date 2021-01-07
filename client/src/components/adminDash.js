/* eslint-disable react/prop-types */
import React from 'react';
import { Layout, Menu } from 'antd';
import AddCandidate from './addCandidate';

const AdminDash = (props) => {
	const { Sider, Content } = Layout;
	const data = [];
	props.names.forEach((element) => {
		if (element.voteCount != 0) {
			const temp = {
				'id': element.name,
				'label': element.name,
				'value': element.voteCount,
			};
			data.push(temp);
		}
	});
	return (
		<Layout>
			<Sider>
				<Menu
					defaultSelectedKeys={['1']}
					mode="inline"
					theme="dark"
				>
					<Menu.Item key="1">
						Create Poll
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Content style={{ padding: '2% 20%', height: '60vh' }}>
					<AddCandidate addNames={props.addNames} />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminDash;