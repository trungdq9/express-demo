/** @jsx React.DOM */
"use strict";
$(function(){
	
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
					<td>
						<Button btnId="" btnText="Edit" btnClass="btn btn-default btn-xs btn-edit" onClick={this.props.onRowEditBtnClick} />
						<Button btnId="" btnText="Delete" btnClass="btn btn-default btn-xs btn-delete" onClick={this.props.onRowDeleteBtnClick} />
					</td>
				</tr>
			);
		}
	}));
	
	var UserTable = React.createFactory(React.createClass({
		onRowEditBtnClick: function(user){
			this.props.getUserInfo(user);
		},
		onRowDeleteBtnClick: function(user){
			this.props.deteteUser(user);
		},
		render: function() {
			var rows = [];
			this.props.users.forEach(function(user) {
				rows.push(<UserRow user={user} key={user.username} 
								   onRowEditBtnClick={this.onRowEditBtnClick.bind(null, user)} 
								   onRowDeleteBtnClick={this.onRowDeleteBtnClick.bind(null, user)}/>);
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
	
	var Button = React.createFactory(React.createClass({
		render: function() {
			return (
				<button id={this.props.btnId} type='button' className={this.props.btnClass} onClick={this.props.onClick}>{this.props.btnText}</button>
			);
		}
	}));
	
	var FormAddUser = React.createFactory(React.createClass({
		getInitialState: function() {
			return {
				userInfo: {}
			};
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
			var content = <div></div>;
			if (this.props.formStatus !== false) {
				var btnActionText = "Add user";
				var readonly = false;
				if (this.props.formStatus === "Edit") {
					btnActionText = "Update user";
					readonly = true;
				}
				content = 
					<div>
						<input id="username" type="text" className="form-control" readOnly={readonly}
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
						<Button btnId="btnAction" btnText={btnActionText} btnClass="btn btn-primary" onClick={this.props.actionOnUser} />
						<Button btnId="btnClose" btnText="Close" btnClass="btn btn-default" onClick={this.props.closeFormAddUser}/>
					</div>;
			}
			return (
				content
			);
		}
	}));
	
	var UserPage = React.createFactory(React.createClass({
		getInitialState: function() {
			return {
				formAddUser: "",
				users: [],
				userInfo: {
					username: "username",
					email: "email@gmail.com",
					gender: "Male",
					birthday: "2016-01-01",
					address: "abc",
					tel: "0909666777"
				},
				formStatus: false,
				btnActionText: "Add"
			};
		},
		componentDidMount: function() {
			this.getUsers();
	    },
		handleUserInput: function(userInfo) {
			this.setState({
				userInfo: userInfo
			});
		},
		bindAddForm: function() {
			this.resetUserInfo();
			this.setState({
				formStatus: "Add"
			});
		},
		getUserInfo: function(userInfo) {
			this.setState({
				userInfo: userInfo
			});
			this.setState({
				formStatus: "Edit"
			});
		},
		removeFormAddUser: function() {
			this.setState({
				formStatus: false
			});
		},
		resetUserInfo: function(){
			this.setState({
				userInfo: {
					username: "",
					email: "",
					gender: "",
					birthday: "",
					address: "",
					tel: ""
				}
			});
		},
		actionOnUser: function() {
			var userInfo = this.state.userInfo;
			var actionUrl = this.state.formStatus === "Add" ? this.props.addUrl : this.props.updateUrl;
			$.ajax({
				type: 'post',
				url: actionUrl,
				dataType: 'json',
				cache: false,
				data: userInfo,
				success: function(data) {
					this.getUsers();
					this.removeFormAddUser();
					this.resetUserInfo();
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
		deleteUser: function(userInfo){
			$.ajax({
				type: 'post',
				url: this.props.deleteUrl,
				dataType: 'json',
				cache: false,
				data: userInfo,
				success: function(data) {
					this.getUsers();
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.addUrl, status, err.toString());
				}.bind(this)
			});
		},
		render: function() {
			return (
				<div>
					<Button btnId="btnAddUser" btnClass="btn btn-primary" btnText="Add new user" onClick={this.bindAddForm}/>
					<FormAddUser formStatus={this.state.formStatus}
								userInfo={this.state.userInfo}
								closeFormAddUser={this.removeFormAddUser}
								actionOnUser={this.actionOnUser}
								onUserInput={this.handleUserInput} />
					<UserTable users={this.state.users}
							   userInfo={this.state.userInfo}
							   getUserInfo={this.getUserInfo} 
							   deteteUser={this.deleteUser} ></UserTable>
				</div>
			);
		}
	}));
	
	/*$(document).ready(function() {
		var userPage = <UserPage url="users/list" 
								 addUrl="users/add"
								 updateUrl="users/update" 
								 deleteUrl="users/delete" />;
		ReactDOM.render(userPage, document.getElementById('content'));
	});*/

});
