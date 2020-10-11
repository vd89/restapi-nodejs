/* 
  Primary File for API 
*/
// Dependencies
const http = require('http');
const url = require('url');

// Config the server to response to all request
const server = http.createServer((req, res) => {
  return res.end('Server is running \n');
});

// Start the server

server.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server is running :>> ', 3000);
});
