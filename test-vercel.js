const handler = require('./api/generate').default;
const httpMocks = require('node-mocks-http');
const fs = require('fs');

async function run() {
  const req = httpMocks.createRequest({
    method: 'POST',
    url: '/api/generate',
    headers: {
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    }
  });

  const res = httpMocks.createResponse();

  // We need to mock a multipart body for formidable, which is tricky in node-mocks-http
  // It's easier to just call the logic
  console.log("Mocking Vercel handler is hard because of formidable multipart stream.");
}
run();
