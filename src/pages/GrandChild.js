import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const GrandChild = ({ route, someProp }) => {
	const history = useHistory();
	console.log(history, '--+++++--', route);

	return (
		<div>
			<h3>Grand Child</h3>
			<div>{someProp}</div>
		</div>
	);
};

GrandChild.propTypes = {
	route: PropTypes.object,
	someProp: PropTypes.string,
};

export default GrandChild;
