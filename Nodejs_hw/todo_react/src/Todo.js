import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem'
import './Todo.css'
const apiUrl = 'http://localhost:8000/api/todos/';

class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			TodoJson:[{
				id:Number,
				title: '',
				createdAt:'',
				updatedAt:''
			}]
		};
    	this.createTodoList = this.createTodoList.bind(this);
    	this.submitTodoList = this.submitTodoList.bind(this);
    	this.removeTodoList = this.removeTodoList.bind(this);
    	this.updateTodoList = this.updateTodoList.bind(this);
	}

	componentDidMount = () => {
		axios.get(apiUrl)
		.then(
			(result) => {
				this.setState({TodoJson: result.data})
			}
		)
		.catch(err => console.log(err))
	}

	createTodoList = (e) => {
    	this.setState({text: e.target.value});
  	}

  	submitTodoList = (e) => {
  		axios.post(apiUrl, {
  			title: this.state.text,
  			'Content-Type': 'application/x-www-form-urlencoded'
  		})
  		.then(
  			res => res.json())
  		.then(
  			(result) => {
  				this.setState({TodoJson: result});
  			})
  		.catch(err => console.log(err))  
  	}

  	removeTodoList = (id) => {
  		axios.delete(apiUrl + id, {todoId:id})
  		.then()
  		.catch(err => console.log(err))  

  		this.setState({TodoJson: this.state.TodoJson.filter((todo) => 
  			{ return todo.id !== id })
  		})
  	}

  	updateTodoList = (id, newTitle) => {
  		if(!newTitle) return;
  		axios.put(apiUrl + id, {
  			todoId:id,
  			title:newTitle
  		})
  		.then(res => console.log(res))
  		.catch(err => console.log(err))  
  		this.setState({TodoJson: this.state.TodoJson.filter((todo) => 
  			{ return todo.id !== id ? todo : todo.title = newTitle})
  		})
  	}

	render() {
		return (
			<div className="todoMain">
				<div className="header">
					<form onSubmit = {this.submitTodoList}>
					<p>Add new todo list: </p>
					<input listName = {this.createTodoList}
					placeholder = "Todo List Name">
					</input>
					<button type = "submit">Submit</button>
					</form>
				</div>

          		<div className="todoList">
          		<ul>
          		{this.state.TodoJson.map(TodoJson => 
          			(<li key={TodoJson.id}>
          			{"Todo List: "}{TodoJson.title}
          			<button onClick={this.removeTodoList.bind(this, TodoJson.id)}>delete</button>

          			{/* won't need this
          			<button onClick={this.updateTodoList.bind(this, TodoJson.id, this.state.text)}>update</button>
          			*/}

          			{<TodoItem curTodo={TodoJson}/>}
          			<p></p>
          			</li>)
          			)}

          		</ul>
          		</div>
				
			</div>
		);
	}
}

export default Todo;