import EventEmitter from 'events';
import Validator from './../lib/Validator';
import AppDispatcher from './../AppDispatcher';

let _list = {
  items: {},
  index: 0
};

let _form = {
  data: {
    title: '',
    content: ''
  },
  errors: {
    title: [],
    content: []
  },
  mode: 'create'
};

let _modal = {
  open: false
};


const Store = Object.assign({}, EventEmitter.prototype, {

  addPost: function(data) {
    let validator = new Validator(data);
    validator.validatePresence('title').
    validatePresence('content');
    if(validator.isValid()){
      _list.items[_list.index+=1] = {
        title: data.title,
        content: data.content,
        id: _list.index
      };
      _form.data = {
        title: '',
        content: ''
      };
      _form.errors = {
        title: [],
        content: []
      };
      _modal.open = false;
    }else{
      _form.errors = validator.errors;
    }
    this.emit('change');
  },

  editPost: function(data) {
    let validator = new Validator(data);
    validator.validatePresence('title').
    validatePresence('content');

    if(validator.isValid()){
      _list.items[data.id] = {
        title: data.title,
        content: data.content,
        id: data.id
      }
      _form.data = {
        title: '',
        content: '',
      };
      _form.errors = {
        title: [],
        content: [],
      };
      _modal.open = false;
    }else{
      _form.errors = validator.errors;
    }
    this.emit('change');
  },

  removePost: function(id) {
    delete _list.items[id];

    this.emit('change');
  },

  setData: function(name, value) {
    _form.data[name] = value;
    this.emit('change');
  },

  setError: function(name, value) {
    _form.errors[name] = value;
    this.emit('change');
  },

  openPopup: function(mode, id) {
    _modal.open = true;
    _form.mode = mode;

    if(mode == 'edit')
      _form.data = {
        title: _list.items[id].title,
        content: _list.items[id].content,
        id: id
      };

    this.emit('change');
  },

  closePopup: function() {
    _modal.open = false;
    _form.mode = 'create';
    this.emit('change');
  },

  get: function() {
    return {
      list: _list,
      form: _form,
      modal: _modal
    };
  }

});


AppDispatcher.register(function(payload) {

  switch(payload.actionType) {
    case 'ADD_POST':
      Store.addPost(_form.data);
    break;
    case 'REMOVE_POST':
      Store.removePost(payload.id);
    break;
    case 'EDIT_POST':
      Store.editPost(_form.data);
    break;
    case 'SET_DATA':
      Store.setData(payload.name, payload.value);
    break;
    case 'SET_ERROR':
      Store.setError(payload.name, payload.value);
    break;
    case 'OPEN_POPUP':
      Store.openPopup(payload.mode, payload.id);
    break;
    case 'CLOSE_POPUP':
      Store.closePopup();
    break;
    default:
      return true;
  }

});

export default Store;
