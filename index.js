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
  const method = req.method.toLowerCase();

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

    // Check the route for a matching path for a handler. If one is not found
    const chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object
    const data = {
      trimmedPath,
      queryStringObj,
      method,
      headers,
      payload: buffer,
    };

    // Route the request to the handler specified in the route
    chosenHandler(data, (statusCode, payload) => {
      // Use the status code return from the handler, or set the default status code to 200
      statusCode = typeof statusCode == 'number' ? statusCode : 200;

      // Use the payload  return from the handler, or set the default payload to on empty object
      payload = typeof payload == 'object' ? payload : {};

      // Convert payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode).end(payloadString);
      console.log('Returning the response: ', statusCode, payloadString);
    });
    console.log('Server data: ', data); // TODO Save to a new file
  });
});

// Start the server

server.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server is running :>> ', 3000);
});

// Define Handlers

const handlers = {
  sample: (data, callBack) => {
    callBack(406, { name: 'Sample Handler' });
  },
  notFound: (data, callback) => {
    callback(404);
  },
};

// Define the request router
const router = {
  sample: handlers.sample,
};
