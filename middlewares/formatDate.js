
const moment = require('moment');

const formatDate = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data, (key, value) => {
        if (typeof value === 'string' && moment(value, moment.ISO_8601, true).isValid()) {
          return moment(value).format('YYYY-MM-DD HH:mm:ss');
        }
        return value;
      });
    }
    originalSend.call(this, data);
  };

  next();
};

module.exports = formatDate;
