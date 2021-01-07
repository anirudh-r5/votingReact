/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, Space, Input, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const AddCandidate = (props) => {
	const [status, setStatus] = useState(false);
	const finish = (val) => {
		if (!val.users || val.users.length === 0) {
			message.error('No names entered', 2.5);
		}
		else {
			setStatus(true);
			props.addNames(val.users);
		}
	};

	return (
		<Form name="dynamic_form_nest_item" onFinish={ finish } autoComplete="off">
			<Form.List name="users">
				{(fields, { add, remove }) => (
					<>
						{fields.map(field => (
							<Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
								<Form.Item
									{...field}
									name={[field.name, 'first']}
									fieldKey={[field.fieldKey, 'first']}
									rules={[{ required: true, message: 'Missing Candidate name' }]}
								>
									<Input placeholder="Candidate Name" />
								</Form.Item>
								<MinusCircleOutlined onClick={() => remove(field.name)} />
							</Space>
						))}
						<Form.Item>
							<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
								Add Candidate
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
			<Form.Item>
				<Button type="primary" htmlType="submit" disabled={status}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddCandidate;