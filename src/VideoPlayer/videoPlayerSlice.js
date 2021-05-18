import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  errorMessage: null,
  status: '',
  data: [],
};

export const videoPlayerSlice = createSlice({
  name: 'videoPlayer',
  initialState,
  reducers: {

  },
})
