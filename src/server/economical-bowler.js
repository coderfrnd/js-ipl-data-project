const matches = require('../data/matches.json')
const deliveries = require('../data/deliveries.json')
const fs = require('fs');

let matchid = matches.filter((info) => info.season == 2015).map((info) => {
   return info.id
})

console.log(matchid);
