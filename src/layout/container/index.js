/**
 * 本来打算在这儿做点事情，后来全部迁移到了其他地方
 * 此组件暂时留下。假如将来真用不到，就再删除
 */
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import s from './index.module.less';

function Container(props) {
	return <div className={s['app-container']}>{props.children}</div>;
}

Container.propTypes = {
	children: PropTypes.object,
};

export default inject('global')(observer(Container));
