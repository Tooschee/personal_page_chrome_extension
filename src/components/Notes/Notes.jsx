import React from 'react';
import { firebaseApp } from 'services/firebase';
import Loading from 'components/_shared/Loading/Loading';
import cx from 'classnames';
import moment from 'moment';
import './styles.scss';

const notes = firebaseApp.database().ref().child('notes');
const notesDefault = 'Add your note...';

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      notes: null,
      updated: moment(),
      focused: false,
      content: notesDefault
    }

    this.contentRef = React.createRef();
  }

  componentDidMount() {
    notes.once('value')
      .then((snapshot) => {
        this.setState({ loading: false, notes: snapshot.val() })
      })
      .catch((e) => {
        console.error(`${this.constructor.name}: something went wrong: ${e}`)
      });

    notes.on('value', (snapshot) => {
      this.setState({ loading: false, notes: snapshot.val(), updated: moment() })
    })
  }

  renderNotes = () => {
    const { notes } = this.state

    if (notes === null) {
      return null;
    }

    return Object.keys(notes).reverse().map((note) => {
      const { description } = notes[note];
      return (
        <div className="notes__item" key={note} >
          <div className="notes__item-content" dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }} />
          <div className="notes__item-options">
            <button
              className="button is-primary is-small is-outlined"
              data-id={note}
              onClick={this.handleDelete}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )
    })
  }

  handleDelete = (event) => {
    const { id } = event.currentTarget.dataset;
    notes.child(id).remove();
  }

  handlefocus = () => {
    this.setState({ focused: true, content: '' })
  }

  handleBlur = () => {
    const { innerHTML } = this.contentRef.current;
    this.setState({ focused: false, content: innerHTML.length === 0 ? notesDefault : innerHTML })
  }

  handleChange = (ev) => { }

  handleSave = () => {
    const { innerHTML } = this.contentRef.current;
    if (innerHTML === notesDefault) {
      return;
    }
    notes.push().set({
      description: innerHTML.replace(/<br\/>/, /\n/)
    }, () => {
      this.setState({ focused: false, content: notesDefault })
    })
  }

  handleClear = () => {
    this.setState({ content: notesDefault })
  }


  render() {
    const { loading, notes, content } = this.state;

    if (loading) {
      return <Loading />
    }

    const noteItemsClassnames = cx('notes__items', { 'notes__items--less-than-4': notes ? Object.keys(notes).length < 4 : false });

    return (
      <div className="notes">
        <div
          contentEditable={true}
          className="notes__input"
          onFocus={this.handlefocus}
          onBlur={this.handleBlur}
          ref={this.contentRef}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </div>
        <div className="notes__options">
          <button className="notes__option" onClick={this.handleSave}><i className="far fa-plus-square" /></button>
          <button className="notes__option" onClick={this.handleClear}><i className="far fa-minus-square" /></button>
        </div>
        <div className={noteItemsClassnames}>
          {this.renderNotes()}
        </div>
      </div>
    );
  }
}

export default Notes;
