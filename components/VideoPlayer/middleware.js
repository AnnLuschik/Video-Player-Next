import { GET_DATA_REQUEST, getDataSuccess, getDataFailure } from './actions';

export const videoPlayerMiddleware = (store) => (next) => (action) => {
  if (action.type === GET_DATA_REQUEST) {
    fetch('https://dl.dropboxusercontent.com/s/jse5lx9xnmcav51/media.json')
      .then((response) => response.json())
      .then((result) => store.dispatch(getDataSuccess(result)))
      .catch((error) => store.dispatch(getDataFailure(error)));
  }
  next(action);
}
