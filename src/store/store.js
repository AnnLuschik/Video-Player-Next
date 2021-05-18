import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { videoPlayerMiddleware } from '../VideoPlayer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [videoPlayerMiddleware],
});
