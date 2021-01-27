import React from 'react';
import { Modal } from 'antd';
import LoginCard from '../login-card';

interface IProps {
	visible: boolean;
	onSuccess: () => void;
}

const LoginModal: React.FC<IProps> = (props: IProps) => {
	return (
		<Modal maskClosable={false} destroyOnClose visible={props.visible}>
			<LoginCard onSuccess={props.onSuccess} />
		</Modal>
	);
};

export default LoginModal;
