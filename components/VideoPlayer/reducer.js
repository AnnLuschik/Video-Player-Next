import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE } from './actions';

const initialState = {
  responseData: null,
  loading: false,
  errorMessage: null,
};

export function videoPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        responseData: action.payload,
        loading: false,
      }
    }
    case GET_DATA_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      }
    }
    default: return state;
  }
}
