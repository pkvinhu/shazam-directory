const express = require('express')
const app = express();
const db = require('./db')
const { Student, School, Teacher} = db.models;
const router = require('./api')
const path = require('path');
const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/api/shazam', router)


app.listen(port, () => {
  console.log('listening')
})

db.syncAndSeed()
.then(() => {
	console.log('synced')
})


module.exports = app;