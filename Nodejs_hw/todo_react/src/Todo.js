import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const apiUrl = "http://localhost:8000/api/todos";

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: '' };
	}

	render() {
		return (
			<div className="Todo">
				<div className="header">
					<form>
					<p>Add new todo item: </p>
					<input placeholder = "New Todo Item">
					</input>
					<button type = "submit">Add task</button>
					<p>Todo List: </p>
					<p>
					Check todo item: 
					<button type = "submit">Done</button>
					</p>
					<button type = "submit">Drop Todo List</button>
					</form>
				</div>
			</div>
		);
	}
}

export default Todo;