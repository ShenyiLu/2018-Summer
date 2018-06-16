import React, { Component } from 'react';
import TodoItems from './TodoItems';
import "./Todo.css";

//const apiUrl = "http://localhost:8000/api/todos";

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '' };
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	addItem(e) {
		// would need link this to last week's job later
		if (this._inputElement.value !== "") {
			var newItem = {
				text: this._inputElement.value,
				key: Date.now()
			};

			this.setState((prevState) => {
				return {
					items: prevState.items.concat(newItem)
				};
			});

			this._inputElement.value = "";
			console.log(this.state.items);
			e.preventDefault();

		}
	}

	deleteItem(key) {
		var filteredItems = this.state.items.filter(function (item){
			return (item.key !== key)
		});

		this.setState({
			items: filteredItems
		});
	}

	render() {
		return (
			<div className="todoMain">
				<div className="header">
					<form onSubmit = {this.addItem}>
					<p>Add new todo item: </p>
					<input ref = {(a) => this._inputElement = a}
						placeholder = "New Todo Item">
					</input>
					<button type = "submit">Add task</button>
					</form>
				</div>
				<TodoItems entries = {this.state.items}
					delete = {this.deleteItem}/>
				<div className="dropList">
					<form>					
					<button type = "submit">Drop Todo List</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Todo;