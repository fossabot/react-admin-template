import React from 'react';

import s from './index.module.less';

export default function GlobalMarquee() {
	return (
		<div className={s.marquee}>
			<div className={s.warning}>
				友情提示：未进行任务确认和数据预处理，会影响数据准确性和效率，请确认后再进行系统操作。
			</div>
		</div>
	);
}
