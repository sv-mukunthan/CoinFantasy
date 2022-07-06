import { useState } from 'react';

export const getBaseURL = () => {
  let baseURL = 'https://api.playinvicta.com'
  // let baseURL = 'https://api.hellaviews.com'
  if(process.env.REACT_APP_NODE_ENV === "development"){
    // baseURL = 'http://localhost:8001'
    // baseURL = 'http://192.168.0.102:8001'
  }else if(process.env.REACT_APP_NODE_ENV === "stage"){
    baseURL = 'https://stage.hellaviews.com'
  }
  return baseURL
}

export const useSetState = (initialState: any) => {
  const [state, setState] = useState(initialState)

  const newSetState = (newState: any) => {
    setState((prevState: any) => ({ ...prevState, ...newState }))
  }
  return [state, newSetState]
}

export const modelError = (error: any) => {
  console.log(JSON.stringify(error.response));
  if (error.response.data.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else if (error.response) {
    return error.response;
  } else {
    return error;
  }
};

const Functions = {
  useSetState,
  getBaseURL,
  modelError
}

export default Functions