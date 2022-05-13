export const USER_STORAGE_KEY = '___user_storage___';

export const BASE_URL =
  'http://localhost:3001';

export const API = {
  auth: `${BASE_URL}${process.env.REACT_APP_API_AUTH || '/auth/login'}`,
  user: `${BASE_URL}${process.env.REACT_APP_REGISTER || '/user'}`,
  username: `${BASE_URL}${process.env.REACT_APP_USERNAME || '/user/username'}`,
  liveness: `${BASE_URL}${process.env.REACT_APP_PROFILE || '/profile'}`,
  company: `${BASE_URL}${
    process.env.REACT_APP_COMPANY || '/company'
  }`,
  accountable: `${BASE_URL}${
    process.env.REACT_APP_API_ACCOUNTABLE || '/accountable'
  }`,
  ticket: `${BASE_URL}${
    process.env.REACT_APP_API_TICKET || '/ticket'
  }`,
  location: `${BASE_URL}${
    process.env.REACT_APP_API_LOCATION || '/location'
  }`,
};
