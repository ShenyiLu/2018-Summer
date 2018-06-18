import React, { Component } from 'react';
import axios from 'axios';
import './Todo.css'
const apiUrl = 'http://localhost:8000/api/todos/';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        todoItems: [],
        curTodo: props.curTodo,
        text: '',
        complete: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTodoItem = this.removeTodoItem.bind(this);
    this.updateTodoItem = this.updateTodoItem.bind(this);
  }

  componentDidMount = () => {

    axios.get(apiUrl + this.state.curTodo.id)
      .then(
        (result) => {
          this.setState({
              todoItems: result.data.todoItems
          });
        }
      )
      .catch(err => console.log(err))
  }
  

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  }

  handleSubmit = (e) => {
      console.log('url = ' + apiUrl + this.state.curTodo.id + '/items')
    axios.post(apiUrl + this.state.curTodo.id + '/items', {
            content: this.state.text,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
      .then(
          res => res.json())
      .then(
        (result) => {
          this.setState({
              todoItems: result.data.content
          });
        })
      .catch(err => console.log(err))  
  }

  removeTodoItem = (id) => {
    axios.delete(apiUrl + this.state.curTodo.id + '/items/' + id)
    .then()
    .catch(err => console.log(err))  

    this.setState({todoItems: this.state.todoItems.filter((todoItem) => { 
        return todoItem.id !== id 
    })})
  }

  updateTodoItem = (id) => {
    axios.put(apiUrl + this.state.curTodo.id + '/items/' + id, {
        complete:true
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))  
    this.setState({todoItems: this.state.todoItems.filter((todoItem) => { 
        return todoItem.id !== id
    })})
  }
  
  render() {
      console.log('items = ')
      console.log(this.state.todoItems)
    return (
      <div className="todoItems">
        <ul>
        <p>Todo Items:</p>
            {this.state.todoItems.map(todoItem => 
                (<li key={todoItem.id}>
                    {todoItem.content} {"Status:"} {todoItem.complete ? 'Complete' : 'Incomplete'}
                    <button onClick={this.removeTodoItem.bind(this, todoItem.id)}>delete</button>
                    <button onClick={this.updateTodoItem.bind(this, todoItem.id)}>update</button>
                </li>
            ))}
            <form onSubmit={this.handleSubmit}>
                <div>
                    <p></p>
                    <input onChange={this.handleChange}
                    placeholder = "New Item"/>
                    <button>Add Todo Item</button>
                </div>
            </form>    
        </ul>
      </div>
      );
  }
}

export default TodoItem;