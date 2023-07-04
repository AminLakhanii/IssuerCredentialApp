const next = require('next');
const { createServer } = require('http');
const { parse } = require('url');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs'); // Add this line to import the fs module

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Import MongoDB URI from mongodb.js
const { MONGODB_URI } = require('./config/mongodb');
const issueCredentialRouter = require('../pages/api/issueCredential');
const retrieveDataRouter = require('../pages/api/retrieveData');

// Initialize the Next.js application
app.prepare().then(() => {
  // Connect to MongoDB using Mongoose
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

  // Create an express server instance
  const server = express();

  // Attach the issueCredentialRouter to the server
  server.use('/api/issueCredential', issueCredentialRouter);

  // Attach the retrieveDataRouter to the server
  server.use('/api/retrieveData', retrieveDataRouter);

  // Serve the form credential JSON-LD context
  server.get('/contexts/formCredentialContext.jsonld', (req, res) => {
    res.sendFile('schemas/formCredentialContext.jsonld', { root: __dirname });
  });

  // Serve the form credential JSON schema
  server.get('/schemas/formCredentialSchema.json', (req, res) => {
    res.sendFile('schemas/formCredentialSchema.json', { root: __dirname });
  });

  // Default request handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Create a server instance
  createServer(server).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
