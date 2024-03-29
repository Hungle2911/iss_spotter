const request = require('request-promise-native');
const url = 'https://api.ipify.org?format=json'
const fetchMyIP = function() {
  return request(url);
};
const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip
  return request(`http://ipwho.is/${ip}`)
};
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
