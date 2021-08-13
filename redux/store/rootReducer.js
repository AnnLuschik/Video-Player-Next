import { combineReducers } from 'redux';
import { videoPlayerReducer } from '../../components/VideoPlayer';

export const rootReducer = combineReducers({
  videoPlayer: videoPlayerReducer,
});
