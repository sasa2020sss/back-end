const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/files', express.static('data'))

const AuthMiddleware = require('./src/middleware/Auth')

app.get('/', function (req, res) {
  const data = {
    success: true,
    msg: 'Welcome to Shuttle Bus-Id',
  }
  res.send(data)
})
app.get('/migrate', function (req, res) {
  require('./src/migrations/Users')
  require('./src/migrations/Users_details')
  require('./src/migrations/Agents')
  require('./src/migrations/Busses')
  require('./src/migrations/Routes')
  require('./src/migrations/Schedules')
  const data = {
    success: true,
    msg: ' migrate succes',
  }
  res.send(data)
})

// app.post('/data', upload.single('picture'), (req, res, next) => {
//   const user = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     imageURL: req.file.path,
//   })
//   user.save().then((result) => {
//     res.status(201).json({
//       message: 'User registered successfully!',
//     })
//   })
// })
// Import router
const UserRouter = require('./src/routers/Users')
const BussesRouter = require('./src/routers/Busses')
const AgentsRouter = require('./src/routers/Agents')
const RoutesRouter = require('./src/routers/Routes')
const UserDetailsRouter = require('./src/routers/Users_details')
const SchedulesRouter = require('./src/routers/Schedules')
const AuthRouter = require('./src/routers/Auth')
const ReservationRouter = require('./src/routers/Reservation')
const TopUpRouter = require('./src/routers/TopUp')

// Define Router
app.use('/users', AuthMiddleware.checkAuthToken, UserRouter)
app.use('/busses', AuthMiddleware.checkAuthToken, BussesRouter)
app.use('/agents', AuthMiddleware.checkAuthToken, AgentsRouter)
app.use('/routes', AuthMiddleware.checkAuthToken, RoutesRouter)
app.use('/userdetails', AuthMiddleware.checkAuthToken, UserDetailsRouter)
app.use('/schedules', AuthMiddleware.checkAuthToken, SchedulesRouter)
app.use('/auth', AuthRouter)
app.use('/reservations', AuthMiddleware.checkAuthToken, ReservationRouter)
app.use('/topup', AuthMiddleware.checkAuthToken, TopUpRouter)

app.listen(process.env.APP_PORT, function () {
  console.log(`Aplication runs in PORT ${process.env.APP_PORT}`)
})
