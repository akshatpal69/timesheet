const express = require('express')
const app = express()
const path = require('path')
// const router  = express.Router
const authRoute = require('./routes/auth')
const emplRoute = require('./routes/empl')
const timesheetRoute = require('./routes/timesheet')
const taskRoute = require('./routes/task')
const rateEmplRoute = require('./routes/rateempl')
const cookieParser = require('cookie-parser')
app.use(cookieParser());
var morgan = require('morgan')
app.use(morgan('tiny'))

const port = 80
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(checkRole)
// app.use((req, res, next) => {
function checkRole(req, res, next) {
  if (req.headers.cookie) {
    const receivedSEssionID = req.cookies.authCookie
    let role = receivedSEssionID.substr(0, 4)
    console.log(role)
    if (role == 'MGRR') {
      // console.log(req.url)
      subbedurl = req.url.substr(0, 8)

      // console.log(subbedurl)
      // apisubbed = req.url.substr(0, 4)
      // console.log(apisubbed)
      // if (apisubbed =='/api'){
      //   console.log('let it go api')
      //   next()
      // }
      if (
        subbedurl == '/manager' ||
        subbedurl == '/api/aut' ||
        subbedurl == '/api/emp' ||
        subbedurl == '/api/tim' ||
        subbedurl == '/api/tas') {
        console.log('let it go manager')
        // next()
      } else {
        return res.status(400).json({ response: 'not allowed' })
      }

    }

    if (role == 'admi') {
      subbedurl = req.url.substr(0, 5)
      console.log(subbedurl)
      console.log('admin role')
      if (
        subbedurl == '/admi' ||
        subbedurl == '/api/' ||
        subbedurl == '/api/' ||
        subbedurl == '/api/' ||
        subbedurl == '/api/') {
        console.log('let it go admin')
        // next()
      } else {
        return res.status(400).json({ response: 'not allowed' })
      }
    }

    if (role == 'empl') {
      console.log(req.url)
      subbedurl = req.url.substr(0, 5)
      console.log(subbedurl)
      if (
        subbedurl == '/empl' ||
        subbedurl == '/api/' ||
        subbedurl == '/api/' ||
        subbedurl == '/api/' ||
        subbedurl == '/api/') {
        console.log('let it go empl')
        // next()
      } else {
        return res.status(400).json({ response: 'not allowed' })
      }

    }
  }
  next()
}

// })

app.use('/api/auth', authRoute)
app.use('/api/empl', emplRoute)
app.use('/api/timesheet', timesheetRoute)
app.use('/api/task', taskRoute)
// app.use('/api/rateempl',rateEmplRoute )


app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})