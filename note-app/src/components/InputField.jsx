import React from "react";
import TodoList from "./toDoList";
import { sendData, deleteList, updateItem } from "../db/postGetDB"

class InputField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { itemsArray: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitList = this.handleSubmitList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpDown = this.handleUpDown.bind(this);
  }
  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  async handleSubmitList(e) {
    e.preventDefault();
    if (this.state.text.length === 0) { return }
    const newItem = {
      text: this.state.text,
      children: '',
      parent: this.props.rootItem._id
    };

    const result = await sendData(newItem);
    this.setState(state => ({ ...this.state, itemsArray: state.itemsArray.concat(result), text: '' }))

  }

  async handleDelete(e) {
    const element = this.state.itemsArray.find(item => item.text === e);
    const result = await deleteList(element);

        if (result.length !== 0) {
          this.setState({ itemsArray: [] });
          result.forEach(e => {
            if (e.parent !== null) {
              e.children.forEach(item => {
                this.setState(state => ({ ...this.state, itemsArray: state.itemsArray.concat(item.children), text: ''}))
              })
            }
          })
        } else { this.setState({ itemsArray: [] })}
      }
      

  async handleUpDown(e, UpDown) {
    const element = {
      item: e,
      position: UpDown
    }
    const result = await updateItem(element);
    result.forEach(e => {
      this.setState({ ...this.state, itemsArray: []})
      if (e.parent !== null) {
        e.children.forEach(item => {
          this.setState(state => ({ ...this.state, itemsArray: state.itemsArray.concat(item.children)}))
        })
      }
    })
  }

  componentDidMount() {

    this.props.item.forEach(element => {
      this.setState(state => ({ itemsArray: state.itemsArray.concat(element.children) }))
    });

  }

  render() {
    return (
      <ul>
        {" "}
        <TodoList
          items={this.state.itemsArray}
          arrayLenght={this.state.itemsArray.length}
          _handleDelete={this.handleDelete.bind(this)}
          _handleUpDown={this.handleUpDown.bind(this)}
        />
        <li>
          <form onSubmit={this.handleSubmitList} className="inputForm">
            <label htmlFor="new-todoLine">Add new line: </label>
            <input value={this.state.text} onChange={this.handleChange} />
            <button className="action-btn">Add</button>
          </form>
        </li>
      </ul>
    );
  }

}
export default InputField;