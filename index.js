/* 
  Primary File for API 
*/
// Dependencies
const { triggerAsyncId } = require('async_hooks');
const http = require('http');
const url = require('url');

// Config the server to response to all request
const server = http.createServer((req, res) => {
  // Parse the url
  const parseUrl = url.parse(req.url, true);

  // Get the path
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the HTTP methods
  const methods = req.method.toLowerCase();

  // send the response
  res.end('Server is running \n');

  // Log the request/response
  console.log('Request received on path: ', trimmedPath, ' with Method ', methods);
});

// Start the server

server.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server is running :>> ', 3000);
});
