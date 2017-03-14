'use strict'

const http = require('http')
const url = require('url')
const fs = require('fs')
let port = 8000

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/pets') {
      fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Internal Server Error');
        } else {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(petsJSON)
        }
      })
    } else if (req.url === '/pets/0') {
      fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Internal Server Error');
        } else {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          let pets0 = JSON.parse(petsJSON)[0]
          res.end(JSON.stringify(pets0))
        }
      })
    } else if (req.url === '/pets/1') {
      fs.readFile('pets.json', 'utf8', (err, petsJSON) => {
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Internal Server Error');
        } else {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          let pets1 = JSON.parse(petsJSON)[1]
          res.end(JSON.stringify(pets1))
        }
      })
    }
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
    }
  }
})


server.listen(port, (err) => {
  console.log('Listening on port', port);
});

module.exports = server;
