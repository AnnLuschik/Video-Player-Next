import { combineReducers } from 'redux';
import { videoPlayerReducer } from '../VideoPlayer';

export const rootReducer = combineReducers({
  videoPlayer: videoPlayerReducer,
});
