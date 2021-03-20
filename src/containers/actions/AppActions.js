import AppDispatcher from './../AppDispatcher';

export function openPopup(id) {
  let payload = {actionType: 'OPEN_POPUP'};

  if(id == undefined) {
    Object.assign(payload, {
      mode: 'create'
    });
  }else{
    Object.assign(payload, {
      id: id,
      mode: 'edit'
    });
  }

  AppDispatcher.dispatch(payload);
}

export function closePopup() {

  AppDispatcher.dispatch({
    actionType: 'CLOSE_POPUP'
  });

}

export function addPost() {

  AppDispatcher.dispatch({
    actionType: 'ADD_POST'
  });

}

export function editPost(id) {

  AppDispatcher.dispatch({
    actionType: 'EDIT_POST',
    id: id
  });

}

export function removePost(id) {

  AppDispatcher.dispatch({
    actionType: 'REMOVE_POST',
    id: id
  });

}

export function setData(name, value) {

  AppDispatcher.dispatch({
    actionType: 'SET_DATA',
    name: name,
    value: value
  });

}
