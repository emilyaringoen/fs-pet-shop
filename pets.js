#!/usr/local/bin/node
'use strict'

const fs = require('fs')
const path = require('path')

const cmd = process.argv[2]
const file = path.basename(process.argv[1])
const index = process.argv[3]

if (cmd === 'read') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    let petArray = JSON.parse(data)

    if (err) throw error
    else if (index === undefined) {
      console.log(petArray);
    }
    else if (index < 0 || index > process.argv.length - 1) {
      console.error(`Usage: node pets.js read INDEX`);
      process.exit(1)
    }
    else {
      console.log(petArray[index]);
    }
  })
}
else if (cmd === 'create') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) throw error
    if (process.argv.length < 6) {
      console.error(`Usage: node pets.js create AGE KIND NAME`);
      process.exit(1)
    }
    else {
      let petArray = JSON.parse(data)
      let age = process.argv[3]
      let newPet = {
        age: parseInt(age),
        kind: process.argv[4],
        name: process.argv[5]
      }

      petArray.push(newPet)
      let petJSON = JSON.stringify(petArray)

      fs.writeFile('pets.json', petJSON, (err) => {
        console.log(newPet);
      })
    }
  })
}
else if (cmd === 'update') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) throw err
    else if (process.argv.length < 7) {
      console.error(`Usage: node pets.js update INDEX AGE KIND NAME`);
      process.exit(1)
    }
    else {
      let petArray = JSON.parse(data)
      let age = process.argv[4]
      let updatedPet = {
        age: parseInt(age),
        kind: process.argv[5],
        name: process.argv[6]
      }

      petArray.splice(index, 1, updatedPet)
      let petJSON = JSON.stringify(petArray)

      fs.writeFile('pets.json', petJSON, (err) => {
        console.log(updatedPet);
      })
    }
  })
}
else if (cmd === 'destroy') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    if (err) throw error
    else if (process.argv.length !== 4) {
      console.error(`Usage: node pets.js destroy INDEX`);
      process.exit(1)
    }
    else {
      let petArray = JSON.parse(data)
      let petGone = petArray.splice(index, 1)
      let petJSON = JSON.stringify(petArray)

      fs.writeFile('pets.json', petJSON, (err) => {
        if (err) throw err
        console.log(petGone[0]);
      })
    }
  })
}
else {
  console.error(`Usage: node pets.js [read | create | update | destroy]`);
  process.exit(1)
}
