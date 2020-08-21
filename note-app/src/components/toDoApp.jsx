import React from "react";
import TodoList from "./toDoList";
import { sendData, getData, deleteList, updateList } from "../db/postGetDB.js"

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.handleUpDown = this.handleUpDown.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) { return }

    const newItem = {
      text: this.state.text,
      children: '',
      parent: ''
    }

    const result = await sendData(newItem);
    this.setState(state => ({ ...this.state, items: state.items.concat(result), text: '' }))

  }

  async componentDidMount() {
    const result = await getData();
    result.forEach(e => {
      if (e.parent === null) {
        this.setState({ ...this.state, items: e.children })
      }
    })
  }

  async delete(e) {
    const element = this.state.items.find(item => item.text === e);

    const result = await deleteList(element);
    if (result.length !== 0) {
      result.forEach(e => {
        if (e.parent === null) {
          this.setState({ ...this.state, items: e.children })
        }
      })
    } else { this.setState({ items: [] }) }
  }

  async handleUpDown(e, UpDown) {
    const element = {
      item: e,
      position: UpDown
    }
    const result = await updateList(element);

    result.forEach(e => {
      if (e.parent === null) {
        this.setState({ ...this.state, items: e.children })
      }
    })
  }

  render() {
    return (
      <div>
        <h3>Notes:</h3>
        <TodoList
          items={this.state.items}
          arrayLenght={this.state.items.length}
          _handleDelete={this.delete.bind(this)}
          _handleUpDown={this.handleUpDown.bind(this)}
        />
        <form onSubmit={this.handleSubmit} className="inputForm">
          <label htmlFor="new-todo">Add note: </label>
          <input
            id="new-todo"
            className="addNote"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button className="action-btn">Add</button>
        </form>
      </div>
    );
  }

}

export default TodoApp;

