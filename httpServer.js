'use strict'

const http = require('http')
const url = require('url')
const fs = require('fs')
let port = 8000

const server = http.createServer((req, res) => {
  let pathName = url.parse(req.url).pathname
  let pathArr = pathName.match(/[^/]+/g);
  if (req.method === 'GET') {
    fs.readFile('pets.json', 'utf8', (err, data) => {
      let petArr = JSON.parse(data)
      if (err) throw err;
        else if (pathArr.length === 1 && pathArr[0] === 'pets') {
        // let petArr = JSON.parse(data)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(petArr))
      } else if (pathArr.length > 1 && pathArr[0] === 'pets' && parseInt(pathArr[1]) >= 0 && parseInt(pathArr[1]) < pathArr.length) {
        let pet = JSON.parse(data)[pathArr[1]]
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(pet))
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
      }
    })
  }
})

server.listen(port, (err) => {
  console.log('Listening on port', port);
});

module.exports = server;
