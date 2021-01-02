import React, { useState } from 'react';
import { Button } from 'antd';

import './styles/index.less';

export default function App(): React.ReactElement {
	const [count, setCount] = useState(666);

	return (
		<div>
			<Button type="primary" onClick={() => setCount(count + 1)}>Hello {count}</Button>
		</div>
	);
}

