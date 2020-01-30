const moment = require('moment');
const stream = require('stream');
const fs = require('fs');

// Getting the current time and date using Moment.js
const data = moment().toString();

// Setting up the delay between each chunk
const delay = 1000;

// Creating modified readable class with overrided _read() method
class Readable extends stream.Readable {
  _read() {
    setTimeout(() => {
      this.push(data);
    }, delay);
  }
}

// Creating modified transform class with overrided _transform() method
class Transform extends stream.Transform {
  _transform(chunk, encoding, next) {
    chunk = chunk.toString('utf8').toLowerCase();
    this.push(chunk);
    next();
  }
}

// Creating modified writable class with overrided _write method
class Writable extends stream.Writable {
  _write(chunk, encoding, next) {
    fs.appendFile(__dirname + '/file.txt', chunk + '\n', err => {
      if (err) {
        return console.log('There was an error!');
      }
      console.log(`Writing this chunk of data: "${chunk}"`);
    });
    next();
  }
}

// Instantiating new readable, transform and writable streams
const readable = new Readable();
const transform = new Transform();
const writable = new Writable();

// Setting up pipes between streams
readable.pipe(transform).pipe(writable);

// Calling the read method of readable stream
readable.read();
