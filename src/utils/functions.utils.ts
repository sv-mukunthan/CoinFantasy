import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const getBaseURL = () => {
  let baseURL = 'https://api.playinvicta.com';
  // let baseURL = 'https://api.hellaviews.com'
  if (process.env.REACT_APP_NODE_ENV === 'development') {
    // baseURL = 'http://localhost:8001'
    // baseURL = 'http://192.168.0.102:8001'
  } else if (process.env.REACT_APP_NODE_ENV === 'stage') {
    baseURL = 'https://stage.hellaviews.com';
  }
  return baseURL;
};

export const useSetState = (initialState: any) => {
  const [state, setState] = useState(initialState);

  const newSetState = (newState: any) => {
    setState((prevState: any) => ({ ...prevState, ...newState }));
  };
  return [state, newSetState];
};

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

const toastSuccessOptions: any = {
  className: 'toast_success',
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  progressStyle: {
    backgroundColor: '#f43f5e',
  },
};

const toastErrorOptions: any = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  progressStyle: {
    backgroundColor: 'red',
  },
};

const toastWarningOption: any = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  progressStyle: {
    backgroundColor: '#F1C411',
  },
};

const toastInfoOption: any = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  progressStyle: {
    backgroundColor: '#3698DB',
  },
};

const Success = (message) => {
  toast.success(message, toastSuccessOptions);
};

const Failure = (message) => {
  toast.error(message, toastErrorOptions);
};

const Info = (message) => {
  toast.info(message, toastInfoOption);
};

const Warning = (message) => {
  toast.warn(message, toastWarningOption);
};

const getTimeStamp = (find, value) => {
  if (find == 'hour') {
    let hour = moment().subtract({ hours: value }).unix();
    let unix = moment(hour * 1000).unix();
    return unix;
  } else {
    let days = moment().subtract(value, 'days').startOf('day').unix();
    // console.log('days', days);
    return days;
  }
};

const formatPersentage = (num) => {
  return `${new Number(num).toFixed(2)}%`;
};

const formatDoller = (number, digits) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'usd',
    minimumSignificantDigits: digits,
  }).format(number);
};

const Functions = {
  useSetState,
  getBaseURL,
  modelError,
  Success,
  Failure,
  Info,
  Warning,
  getTimeStamp,
  formatPersentage,
  formatDoller,
};

export default Functions;
