const fs = require('fs');
const net = require('net');
const request = require('request');


//take in URL from command line and local file path
const myArgs = process.argv.slice(2);
// const host = myArgs[0].slice(11);
const port = 80;
let hostString = myArgs[0].slice(11);

//discard char at end if "/"
if (hostString.charAt(hostString.length - 1) === '/') {
  hostString = hostString.slice(0,-1);
}

const conn = net.createConnection({
  host: hostString,
  port: port
});

conn.setEncoding('UTF8'); // 1 byte per char

conn.on('connect', () => {
  // console.log(`Connected to server!`);
  conn.write(`GET / HTTP/1.1\r\n`); //making the request for this http protocol
  conn.write(`Host: hostString\r\n`);//from this host ==> this is inputted
  conn.write(`\r\n`);
});

request(myArgs[0], (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //  console.log('body:', body); // Print the HTML for the Google homepage.
   
  fs.writeFile(myArgs[1], body, () => {
    console.log('Downloaded and saved ', body.length,' bytes to ', myArgs[1]);//is this correct parameter to use?
    conn.end(); //upon receipt of data, end connection
  });
});


