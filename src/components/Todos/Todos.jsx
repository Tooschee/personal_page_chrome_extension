import React from 'react';
import { firebaseApp } from 'services/firebase';
import Loading from 'components/_shared/Loading/Loading';
import cx from 'classnames';
import moment from 'moment';
import './styles.scss';

const todos = firebaseApp.database().ref().child('todos');

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      todos: null,
      updated: moment(),
      content: ''
    }
  }

  componentDidMount() {
    todos.once('value')
      .then((snapshot) => {
        this.setState({ loading: false, todos: snapshot.val() })
      })
      .catch((e) => {
        console.error(`${this.constructor.name}: something went wrong: ${e}`)
      });

    todos.on('value', (snapshot) => {
      this.setState({ loading: false, todos: snapshot.val(), updated: moment() })
    })
  }

  handleTodoToggle = (event) => {
    const { id, done } = event.currentTarget.dataset;
    todos.child(id).update({ done: done !== 'true' });
  }

  handleAddtodo = (ev) => {
    ev.preventDefault();
    const { value } = ev.target.elements[0];

    if (value.length === 0) {
      return;
    }

    todos.push().set({
      description: value,
      done: false
    })

    this.setState({ content: '' })
  }

  handledeleteTodo = (event) => {
    const { id } = event.currentTarget.dataset;
    todos.child(id).remove();
  }

  handleChange = (ev) => {
    const { value } = ev.currentTarget;
    this.setState({ content: value })
  }

  renderTodos = () => {
    const { todos } = this.state

    if (todos === null) {
      return null
    }
    const keys = Object.keys(todos);

    return keys.reverse().map((todo) => {
      const { description, done } = todos[todo];
      const classnames = cx('todos__content', { 'is-strikethrough': done });

      const doneIcon = done ? 'fas fa-check-square' : 'far fa-square';

      return (
        <div className="media todos__item" key={todo}>
          <div className="media-left"
            data-id={todo}
            data-done={done}
            onClick={this.handleTodoToggle}
          >
            <i className={doneIcon}></i>
          </div>
          <div className="media-content">
            <div className={classnames}>
              {description}
            </div>
          </div>
          <div className="media-right">
            <button
              className="delete"
              data-id={todo}
              onClick={this.handledeleteTodo}
            />
          </div>
        </div>
      )
    })
  }

  render() {
    const { loading, content } = this.state;

    if (loading) {
      return <Loading />
    }

    return (
      <div className="todos">
        <form onSubmit={this.handleAddtodo} autoComplete="off">
          <input
            name='todo'
            placeholder={'Add new todo...'}
            value={content}
            type="text"
            onChange={this.handleChange}
            className="input is-small todos__input" />
        </form>
        <div className="todos__items">
          {this.renderTodos()}
        </div>
      </div>
    );
  }
}

export default Todos;
