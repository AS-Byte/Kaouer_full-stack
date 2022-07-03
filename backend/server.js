const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

// E-mailing
const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
  service:"outlook",
  //host: "smtp.mailtrap.io",
  //port: 2525,
  auth: {
    //user: "9ed730d4516087",
    //pass: "694acc0e56afe2"
    user: "amine.n.oueslati@outlook.fr",
    pass: "Pidev$2022"
  }
});

const options={
  from: "amine.n.oueslati@outlook.fr",
  to: "amine.n.oueslati@gmail.com",
  subject: "bienvenue",
  text: "too simple"
}

transport.sendMail(options, function (err,info){
  if (err){
    console.log(err);
    return;
  }
  console.log("Sent: "+ info.response);

})
// Connecting with mongo db
mongoose
  .connect('mongodb+srv://pidev:pidev@cluster0.bjj7r.mongodb.net/pidev')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

// Setting up port with express js
const terrainRoute = require('../backend/routes/terrain.route')
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/terrain-crud')))
app.use('/', express.static(path.join(__dirname, 'dist/terrain-crud')))
app.use('/api', terrainRoute)

// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message) // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})


