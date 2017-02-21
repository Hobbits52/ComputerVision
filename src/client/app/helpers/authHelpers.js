import axios from 'axios';

exports.signup = (user) => {
  return axios({
    method: 'POST',
    url: 'auth/signup',
    data: user
  });
}

exports.login = (user) => {
  return axios({
    method: 'POST',
    url: 'auth/login',
    data: user
  });  
};

exports.logout = () => {
  return axios.get('auth/logout');
};

// exports.logout = () => axios.get('auth/logout');