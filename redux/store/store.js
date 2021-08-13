import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { videoPlayerMiddleware } from '../../components/VideoPlayer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [videoPlayerMiddleware],
});
