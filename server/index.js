const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('../database/index');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/donate', (req, res) => {
//   db.Service.find({}).exec((err, data) => {
//     if (err) throw err;
//     res.send({
//       donate: data
//     })
//   })
// })

app.get('/payItForward', (req, res) => {
  db.Transaction.find({}).exec((err, data) => {
    if (err) throw err;
    res.send({
     payItForward: data
    })
  })
})

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
