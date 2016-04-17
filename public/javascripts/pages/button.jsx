import React from 'react';
var Button = React.createFactory(React.createClass({
		render: function() {
			return (
				<button type='button'>Click</button>
			);
		}
	}));

export default Button;