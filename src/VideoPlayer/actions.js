export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

export function getDataRequest(query) {
  return {
    type: GET_DATA_REQUEST,
    payload: query,
  }
}

export function getDataSuccess(data) {
  return {
    type: GET_DATA_SUCCESS,
    payload: data,
  }
}

export function getDataFailure(error) {
  return {
    type: GET_DATA_FAILURE,
    payload: error,
  }
}
