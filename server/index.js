const express = require('express')
const app = express();
const db = require('./db')
const router = require('./api')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/api/shazam', router)


app.listen(3000, () => {
  console.log('listening')
})

db.syncAndSeed();


module.exports = app;