const moment = require('moment');
const fs = require('fs');

const writableStream = fs.createWriteStream(__dirname + '/file.txt', {
  encoding: 'utf8'
});

setInterval(() => {
  writableStream.write(moment().format() + '\n');
  console.log('Date is recorded');
}, 1000);
