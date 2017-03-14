#!/usr/local/bin/node
'use strict'

const fs = require('fs')
const path = require('path')

const file = path.basename(process.argv[1])
const num = process.argv[3]
const cmd = process.argv[2]

if (cmd === 'read') {
  fs.readFile('pets.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    if (err) {
      throw err
    } else if (num === undefined) {
      console.log(data);
    } else if (num < 0 || num > data.length - 1 || isNaN(num)) {
      console.error(`USAGE node pets.js read INDEX`);
      process.exit(1)
    } else {
      console.log(data[num])
    }
  })
} else if (cmd === 'create') {
  fs.readFile('pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let petArray = JSON.parse(data)
    const newObj = {age: parseInt(num), kind: process.argv[4], name: process.argv[5]}

    if (process.argv.length < 6) {
      console.error(`Usage: node pets.js create AGE KIND NAME`);
      process.exit(1);
    }
    else {
      petArray.push(newObj);
      let petJSON = JSON.stringify(petArray);
      fs.writeFile('pets.json', petJSON, (err) => {
        if (err) throw err
        console.log(newObj);
      })
    }
  })
} else if (cmd === 'update') {
  fs.readFile('pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let petArray = JSON.parse(data)
    const index = process.argv[3]
    const num2 = process.argv[4]
    const newObj = {age: parseInt(num2), kind: process.argv[5], name: process.argv[6]}

    if (process.argv.length < 7) {
      console.error(`Usage: node pets.js update INDEX AGE KIND NAME`);
      process.exit(1);
    }
    else {
      petArray.splice(index, 1, newObj);
      let petJSON = JSON.stringify(petArray);
      fs.writeFile('pets.json', petJSON, (err) => {
        if (err) throw err
        console.log(newObj);
      })
    }
  })
} else if (cmd === 'destroy') {
  if (process.argv.length !== 4) {
    console.error(`Usage: node pets.js destroy INDEX`);
    process.exit(1)
  } else {
    fs.readFile('pets.json', 'utf8', function(err, data) {
      if (err) throw err
      else {
        let petArray = JSON.parse(data)
        let killed = petArray.splice(num, 1)
        let petJSON = JSON.stringify(petArray)
        fs.writeFile('pets.json', petJSON, (err) => {
          if (err) throw err
          console.log(killed[0]);
        })
      }
    })
  }
}
else {
  console.error(`Usage: node ${file} [read | create | update | destroy]`)
  process.exit(1)
}
