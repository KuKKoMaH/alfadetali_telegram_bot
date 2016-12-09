const fetch = require('./fetch');
const config = require('../config');

module.exports = {
  login: () => {
    return fetch('POST', `${config.apiUrl}login`).then(resp => resp.token)
  },
  search: (q, token) => {
    return fetch('POST', `${config.apiUrl}detectum`, { q, limit: 10, offset: 0 }, { token });
  }
};
