import React from "react";
import InputField from "./InputField";

class TodoList extends React.Component {

  handleDelete = (id) => {
    this.props._handleDelete(id);
  }
  handleUpDown = (item, UpDown) => {
    this.props._handleUpDown(item, UpDown);
  }

  render() {
    return (
      <ul>
        {" "}
        {(this.props.items || []).map(item => (
          <div key={item._id}>
            <div>
              <li>
                <button
                  className="action-btn"
                  onClick={this.handleDelete.bind(this, item.text)}
                >
                  Delete
              </button>
                <button
                  className="action-btn"
                  id="btnUp"
                  onClick={this.handleUpDown.bind(this, item, item.UpDown = "Up")}
                  disabled={(this.props.items.indexOf(item) === 0) ? true : false}
                >
                  Up
                </button>
                <button
                  className="action-btn"
                  id="btnDown"
                  onClick={this.handleUpDown.bind(this, item, item.UpDown = "Down")}
                  disabled={(this.props.items.indexOf(item) === this.props.arrayLenght - 1) ? true : false}
                >
                  Down
                </button>
              </li>
              <li className="note">{item.text}</li>
            </div>
            <InputField item={item.children} rootItem={item} />
          </div>
        ))}
      </ul>
    );
  }
}

export default TodoList;