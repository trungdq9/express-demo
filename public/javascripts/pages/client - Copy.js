/** @jsx React.DOM */
"use strict";
$(function(){	
	var ProductCategoryRow = React.createFactory(React.createClass({
		render: function() {
			return (<tr><th colSpan="2">{this.props.category}</th></tr>);
		}
	}));

	var ProductRow = React.createFactory(React.createClass({
		render: function() {
			var style={color: 'blue'},
				name = this.props.product.stocked ?
				this.props.product.name :
				<span style={style}>
					{this.props.product.name}
				</span>;
			return (
				<tr>
					<td>{name}</td>
					<td>{this.props.product.price}</td>
				</tr>
			);
		}
	}));

	var ProductTable = React.createFactory(React.createClass({
		render: function() {
			var rows = [];
			var lastCategory = null;
			this.props.products.forEach(function(product) {
				if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
					return;
				}
				if (product.category !== lastCategory) {
					rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
				}
				rows.push(<ProductRow product={product} key={product.name} />);
				lastCategory = product.category;
			}.bind(this));
			return (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			);
		}
	}));
					
	var SearchBar = React.createFactory(React.createClass({
		handleChange: function() {
			this.props.onUserInput(
				this.refs.filterTextInput.value,
				this.refs.inStockOnlyInput.checked
			);
		},
		render: function() {
			return (
				<form>
					<input type="text" placeholder="Search..."
						value={this.props.filterText}
						ref="filterTextInput"
						onChange={this.handleChange} />
					<p>
						<input type="checkbox" 
							checked={this.props.inStockOnly} 
							ref="inStockOnlyInput"
							onChange={this.handleChange} />
						{' '}
						Only show products in stock
					</p>
				</form>
			);
		}
	}));

	var FilterableProductTable = React.createFactory(React.createClass({
		getInitialState: function() {
			return {products: [
							   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
							   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
							   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
							   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
							   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
							   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
							 ],
					filterText: '',
					inStockOnly: false
				   }
		},
		handleUserInput: function(filterText, inStockOnly) {
			this.setState({
				filterText: filterText,
				inStockOnly: inStockOnly
			});
		},
		render: function() {
			return (
				<div>
					<SearchBar filterText={this.state.filterText}
						inStockOnly={this.state.inStockOnly}
						onUserInput={this.handleUserInput}/>
					<ProductTable products={this.state.products}
						filterText={this.state.filterText}
						inStockOnly={this.state.inStockOnly}/>
				</div>
			);
		}
	}));
	 
	/*$(document).ready(function() {
		//var element = React.createElement(FilterableProductTable);
		var element = <FilterableProductTable />;
		var div = React.createFactory('div');
		var root = React.DOM.ul({ className: 'my-list' },
             React.DOM.li(null, 'Text Content')
           );
		ReactDOM.render(element, document.getElementById('content'));
		ReactDOM.render(
			element,
			document.getElementById('content')
		);
	});*/
	
	var UserRow = React.createFactory(React.createClass({
		render: function() {
			return (
				<tr>
					<td>{this.props.user.username}</td>
					<td>{this.props.user.email}</td>
					<td>{this.props.user.gender}</td>
					<td>{this.props.user.birthday}</td>
					<td>{this.props.user.address}</td>
					<td>{this.props.user.tel}</td>
					<td><button type="button" onClick={this.props.onRowClick} className='btn btn-default btn-xs'>Edit</button></td>
				</tr>
			);
		}
	}));
	
	var UserTable = React.createFactory(React.createClass({
		onRowClick: function(user){
			//this.props.getUserInfo({userInfo: user});
		},
		render: function() {
			var rows = [];
			this.props.users.forEach(function(user) {
				rows.push(<UserRow user={user} key={user.username} onRowClick={this.onRowClick.bind(null, user)} />);
			}.bind(this));
			return (
				<table className='table table-bordered'>
					<thead>
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Gender</th>
							<th>Birthday</th>
							<th>Address</th>
							<th>Tel</th>
							<th>Operations</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</table>
			);
		}
	}));
	
	var AddUserButton = React.createFactory(React.createClass({
		render: function() {
			return (
				<button id='btnAddUser' type='button' className='btn btn-primary' onClick={this.props.onClick}>Add new user</button>
			);
		}
	}));
	
	var AddArea = React.createFactory(React.createClass({
		render: function() {
			return (
				<div className='addArea'>
					<button id='btnAddUser' type='button' className='btn btn-primary' onClick={this.props.onClick}>Add new user</button>
					<div className='addForm' id='addForm'>{this.props.addForm}</div>
				</div>
			);
		}
	}));
	
	var AddForm = React.createFactory(React.createClass({
		getInitialState: function() {
			return {}
		},
		handleChange: function() {
			this.props.onUserInput({
				username: this.refs.username.value,
				email: this.refs.email.value,
				gender: this.refs.gender.value,
				birthday: this.refs.birthday.value,
				address: this.refs.address.value,
				tel: this.refs.tel.value
			});
		},
		render: function() {
			return (
				<div>
					<input id="username" type="text" className="form-control" 
						placeholder="Username" ref="username" value={this.props.userInfo.username} onChange={this.handleChange}/>
					<input id="email" type="text" className="form-control" 
						placeholder="Email" ref="email" value={this.props.userInfo.email} onChange={this.handleChange}/>
					<input id="gender" type="text" className="form-control" 
						placeholder="Gender" ref="gender" value={this.props.userInfo.gender} onChange={this.handleChange}/>
					<input id="birthday" type="text" className="form-control" 
						placeholder="yyyy-mm-dd" ref="birthday" value={this.props.userInfo.birthday} onChange={this.handleChange}/>
					<input id="address" type="text" className="form-control" 
						placeholder="Address" ref="address" value={this.props.userInfo.address} onChange={this.handleChange}/>
					<input id="tel" type="text" className="form-control" 
						placeholder="Tel" ref="tel" value={this.props.userInfo.tel} onChange={this.handleChange}/>
					<button type="button" className="btn btn-primary" id="btnAdd" onClick={this.props.addUser}>Add User</button>
					<button type="button" className="btn btn-default" id="btnClose" onClick={this.props.closeAddForm}>Close</button>
				</div>
			);
		}
	}));
	
	var UserPage = React.createFactory(React.createClass({
		getInitialState: function() {
			return {
				addForm: "",
				users: [],
				newUser: {
					username: "username",
					email: "email@gmail.com",
					gender: "Male",
					birthday: "2016-01-01",
					address: "abc",
					tel: "0909666777"
				},
				userInfo: {
					username: "",
					email: "",
					gender: "",
					birthday: "",
					address: "",
					tel: ""
				}
			};
		},
		componentDidMount: function() {
			this.getUsers();
	    },
		handleUserInput: function(userInfo) {
			this.setState({
				newUser: userInfo
			});
			console.log(this.state.newUser.username);
		},
		bindAddArea: function() {
			var form = <AddForm closeAddForm={this.removeAddForm} 
								addUser={this.addUser} 
								onUserInput={this.handleUserInput}
								userInfo={this.state.newUser} />;
			this.setState({
				addForm: form
			});
		},
		/*getUserInfo: function(userInfo) {
			this.setState({
				userInfo: userInfo
			});
			this.bindUpdateArea();
		},*/
		/*bindUpdateArea: function() {
			var form = <AddForm closeAddForm={this.removeAddForm} 
								addUser={this.addUser} 
								onUserInput={this.handleUserInput}
								newUser={this.state.userInfo} />;
			this.setState({
				addForm: form
			});
		},*/
		removeAddForm: function() {
			var form = "";
			this.setState({
				addForm: form
			});
		},
		addUser: function() {
			var userInfo = this.state.newUser;
			$.ajax({
				type: 'post',
				url: this.props.addUrl,
				//url: "users/add",
				dataType: 'json',
				cache: false,
				data: userInfo,
				success: function(data) {
					this.getUsers();
					this.removeAddForm();
					this.setState({
						newUser: {
							username: "",
							email: "",
							gender: "",
							birthday: "",
							address: "",
							tel: ""
						}
					});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.addUrl, status, err.toString());
				}.bind(this)
			});
		},
		getUsers: function(){
			$.get(this.props.url, function(result) {
				if (this.isMounted()) {
					this.setState({
						users: result
					});
				}
			}.bind(this));
		},
		render: function() {
			return (
				<div>
					<AddArea onClick={this.bindAddArea}
							 addForm={this.state.addForm} 
							 userInfo={this.state.newUser} />
					<UserTable users={this.state.users} 
							   /*onRowClick={this.bindUpdateArea}
							   userInfo={this.state.userInfo} 
							   getUserInfo={this.getUserInfo}*/ ></UserTable>
				</div>
			);
		}
	}));
	
	var Todo = React.createFactory(React.createClass({
	  render: function() {
		return <div onClick={this.props.onClick}>{this.props.title}</div>;
	},

	//this component will be accessed by the parent through the `ref` attribute
	  animate: function() {
		console.log('Pretend %s is animating', this.props.title);
	  }
}));

	var Todos = React.createFactory(React.createClass({
		  getInitialState: function() {
			return {items: ['Apple', 'Banana', 'Cranberry']};
		  },

		  handleClick: function(index) {
			var items = this.state.items.filter(function(item, i) {
			  return index !== i;
			});
			this.setState({items: items}, function() {
			  if (items.length === 1) {
				this.refs.item0.animate();
			  }
			}.bind(this));
		  },

		  render: function() {
			return (
			  <div>
				{this.state.items.map(function(item, i) {
				  var boundClick = this.handleClick.bind(this, i);
				  return (
					<Todo onClick={boundClick} key={i} title={item} ref={'item' + i} />
				  );
				}, this)}
			  </div>
			);
		  }
}));
	
	$(document).ready(function() {
		var userPage = <UserPage url="users/list" 
								 addUrl="users/add" />;
		ReactDOM.render(userPage, document.getElementById('content'));
	});

});
