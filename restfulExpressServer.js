'use strict';
const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const port = 8000
const bodyParser = require('body-parser')


app.disable('x-powered-by')
app.use(bodyParser.json())

app.set('port', process.env.PORT || 8000)


app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404)
    }
    let pets = JSON.parse(petsJSON)
    res.send(pets)
  })
})

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404)
    }
    let id = Number.parseInt(req.params.id)
    let pets = JSON.parse(petsJSON)
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    res.send(pets[id])
  })
})

app.post('/pets', (req, res) => {
if (req.body.name === '' || req.body.age === '' || req.body.kind === '') {
  res.statusCode = 400
  res.setHeader('Content-Type', 'text/plain')
  return res.end('Bad Request')
}
  let newPet = {
    name: req.body.name,
    age: req.body.age,
    kind: req.body.kind
  }
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404)
    }
    let pets = JSON.parse(petsJSON)
    pets.push(newPet)
    res.send(newPet)
    let JSONpet = JSON.stringify(pets)
    fs.writeFile('pets.json', JSONpet, (err) => {
      console.log(newPet);
    })
  })
})

app.patch('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404)
    }
    let id = Number.parseInt(req.params.id)
    let pets = JSON.parse(petsJSON)
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    for (let key in req.body) {
      pets[id][key] = req.body[key]
    }
    res.send(pets[id])
    let JSONpet = JSON.stringify(pets)
    fs.writeFile('pets.json', JSONpet, (err) => {
      console.log(pets[id]);
    })
  })
})

app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(404)
    }
    let id = Number.parseInt(req.params.id)
    let pets = JSON.parse(petsJSON)
    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404)
    }
    let pet = pets.splice(id, 1)[0]
    res.send(pet)
    let JSONpet = JSON.stringify(pets)
    fs.writeFile('pets.json', JSONpet, (err) => {
      console.log(pets);
    })
  })
})



app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(app.get('port'), () => {
  console.log("listening on", port);
})

module.exports = app
