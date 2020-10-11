/* 
  Primary File for API 
*/
// Dependencies
const { triggerAsyncId } = require('async_hooks');
const http = require('http');
const { StringDecoder } = require('string_decoder');
const url = require('url');

// Config the server to response to all request
const server = http.createServer((req, res) => {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the Query string as an object
  const queryStringObj = parsedUrl.query;

  // Get the HTTP methods
  const methods = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    // Send the response
    res.end('Server is running \n');

    // Log the request/response
    console.log('Request received with payload:', buffer);
  });

  // Log the request/response
  console.log('Request path:', trimmedPath, ',Method:', methods, ',Query: ', queryStringObj, ',Header:', headers);
});

// Start the server

server.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server is running :>> ', 3000);
});
