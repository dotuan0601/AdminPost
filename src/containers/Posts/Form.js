import React from 'react';
import TextField from './TextField';
import Modal from './Modal';
import Store from './../stores/Store';
import * as AppActions from './../actions/AppActions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = Store.get().form;
  }

  componentWillMount() {
    Store.on('change', function() {
      this.setState(Store.get().form);
    }.bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();

    if(this.state.mode == 'create'){
      AppActions.addPost();
    }else {
      AppActions.editPost(this.props.id);
    }

  }

  _handleClose(e) {
    e.preventDefault();
    AppActions.closePopup();
  }

  render() {

    let title;

    if (this.state.mode == 'edit'){
      title = "Edit Post: " + this.state.data.title
    }
    else {
      title = "New Post"
    }


    return (
      <Modal>
        <form onSubmit={this._handleSubmit}>
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={this._handleClose}></button>
          </header>
          <section className="modal-card-body">
            <TextField label="Title" name="title" value={this.state.data.title} errors={this.state.errors['title']} />
            <TextField label="Content" name="content" value={this.state.data.content}  errors={this.state.errors['content']} />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary">Save</button>
            <a className="button" onClick={this._handleClose}>Cancel</a>
          </footer>
        </form>
      </Modal>
    );
  }
}

export default Form;
