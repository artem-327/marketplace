const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser')
const request = require('request')
const axios = require('axios')
const bodyParser = require('body-parser')
const plaid = require('plaid')

// We store the access_token in memory - in production, store it in
// a secure persistent data store.
let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null

const client = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox
)

let router = express()
const app = express()
//app.use(express.static('public'))
//app.set('view engine', 'ejs')
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

app.post('/get_access_token', (request, response, next) => {
  PUBLIC_TOKEN = request.body.public_token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + error)
      return response.json({ error: msg })
    }
    ACCESS_TOKEN = tokenResponse.access_token
    ITEM_ID = tokenResponse.item_id
    console.log('Access Token: ' + ACCESS_TOKEN)
    console.log('Item ID: ' + ITEM_ID)
    prettyPrintResponse(tokenResponse)
    response.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: false
    })
  })
})

router.get('/attachments/:id', (req, res) => {
  request
    .get(
      `${(process &&
        process.env &&
        process.env.REACT_APP_API_URL &&
        process.env.REACT_APP_API_URL.replace(/\/\s*$/, '')) ||
        'http://127.0.0.1:8080'}/prodex/api/attachments/${req.params.id}/download`,
      {
        auth: {
          bearer: JSON.parse(req.cookies.auth).access_token
        }
      }
    )
    .pipe(res)
})

app.get('/gravatar/:hash', (req, res) => {
  const { hash } = req.params
  axios
    .get(`https://www.gravatar.com/${hash}.json`)
    .then(_response => {
      res.status(200).send({ src: `http://secure.gravatar.com/avatar/${hash}` })
    })
    .catch(_error => {
      res.status(200).send({ src: null })
    })
})

nextApp
  .prepare()
  .then(() => {
    app.use(cookieParser())
    app.use('/download', router)
    app.use('/prodex', proxy({ target: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080', changeOrigin: true }))
    app.use(nextApp.getRequestHandler()).listen(port, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
