/** @jsx React.DOM */
"use strict";
$(function(){	
	var Filters = React.createFactory(React.createClass({
	  handleFilterChange: function() {
		var value = this.refs.filterInput.value;
		this.props.updateFilter(value);
	  },
	  render: function() {
		return <input type="text" ref="filterInput" onChange={this.handleFilterChange} placeholder="Filter" />;
	  }
	}));

	var List = React.createFactory(React.createClass({
	  handleChange: function(value) {
		console.log(value);
		this.props.handleChange(value);
	  },
	  render: function() {
		var content;
		if (this.props.items.length > 0) {
		  var items = this.props.items.map(function(item) {
			return <li>{item}</li>;
		  });
		  content = <ul>{items}</ul>
		} else {
		  content = <p>No items matching this filter</p>;
		}
		return (
		  <div className="results">
			<h4>Results</h4>
			{content}
			<Input value={this.props.value} handleChange={this.handleChange}/>
		  </div>
		);
	  }
	}));
	
	var Input = React.createFactory(React.createClass({
	  handleChange: function() {
		this.props.handleChange(this.refs.refInput.value);
	  },
	  render: function() {
		return <input type="text" value={this.props.value} ref="refInput" onChange ={this.handleChange} placeholder="value" />;
	  }
	}));

	var ListContainer = React.createFactory(React.createClass({
	  getInitialState: function() {
		return {
		  listItems: ['Chicago', 'New York', 'Tokyo', 'London', 'San Francisco', 'Amsterdam', 'Hong Kong'],
		  nameFilter: ''
		};
	  },
	  handleFilterUpdate: function(filterValue) {
		this.setState({
		  nameFilter: filterValue
		});
	  },
	  render: function() {
		var displayedItems = this.state.listItems.filter(function(item) {
		  var match = item.toLowerCase().indexOf(this.state.nameFilter.toLowerCase());
		  return (match !== -1);
		}.bind(this));

		return (
		  <div>
			<Filters updateFilter={this.handleFilterUpdate} />
			<List items={displayedItems} handleChange={this.handleFilterUpdate} value={this.state.nameFilter}/>
		  </div>
		);
	  }
	}));
	
	$(document).ready(function() {
		ReactDOM.render(<ListContainer />, document.getElementById('content'));
	});

});
