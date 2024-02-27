/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const url = 'https://api.ipify.org?format=json';
const fetchMyIP = function(callback) {
  request(url, (error, response, data) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${data}`), null);
      return;
    }

    const ip = JSON.parse(data).ip;
    callback(null, ip);
  });
};
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});
  });
};
module.exports = { fetchMyIP, fetchCoordsByIP };