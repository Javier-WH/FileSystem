const os = require('os');
const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces.Ethernet[1].address;

module.exports = { ip }