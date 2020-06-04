const request = require('request');

const fetchMyIP = function(callback) { 
  request('https://api.ipify.org?format=json', (error, response, body) => {
    const data = JSON.parse(body);
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (data) {
      callback(null, data['ip'])
    }
  }) 
};

const fetchCoordsByIP = (ip, callback) => {
  console.log(ip)
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    const data = JSON.parse(body);
    // console.log(data)
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (data) {
      const coordinates = {latitude: data.data['latitude'], longitude: data.data['longitude']};
      callback(null, coordinates);
    }
  }) 
}


module.exports = { 
  fetchMyIP,
  fetchCoordsByIP
}

