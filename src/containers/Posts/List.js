import React from 'react';
import Item from './Item';
import Modal from './Modal';
import Form from './Form';
import Store from './../stores/Store';
import * as AppActions from './../actions/AppActions';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.get().list;
  }

  componentWillMount() {
    Store.on('change', function() {
      this.setState(Store.get().list);
    }.bind(this));
  }

  _handleAddPost(e) {
     e.preventDefault();
     AppActions.openPopup();
  }

  render() {
    let items = Object.keys(this.state.items).map(function(k) {
      let i = this.state.items[k];
      return <Item key={k} id={i.id} title={i.title} content={i.content} />;
    }.bind(this));

    return (
      <div className="panel">
        <p className="panel-heading">
          List posts
        </p>
        <div className="panel-block has-text-centered">
          {(function() {
            if(items.length > 0){
              return <table className="table">
                       <thead>
                         <tr>
                           <th>Title</th>
                           <th>Content</th>
                           <th></th>
                         </tr>
                       </thead>
                       <tbody>
                         { items }
                       </tbody>
                     </table>;
            }
          })()}
          <a className="button is-link" onClick={this._handleAddPost}>Create new post</a>
        </div>
      </div>
    );
  }
}
