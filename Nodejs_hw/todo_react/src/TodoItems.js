import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TodoItems extends Component {

  constructor(props) {
  	super(props);

  	this.createTasks = this.createTasks.bind(this);
  }

  createTasks(item) {
  	return <li onClick = {() => this.delete(item.key)}
  	 key = {item.key}>{item.text}</li>
  }

  update(complete) {
  	
  }

  delete(key) {
  	this.props.delete(key);
  }

  render(){
  	var todoEntries = this.props.entries;
  	var listItems = todoEntries.map(this.createTasks);

  	return (
  		<ul className="theList">
  		{listItems}
  		</ul>
  	);
  }
}

export default TodoItems;