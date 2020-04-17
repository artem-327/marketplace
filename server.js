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

let router = express()
const app = express()

router.get('/attachments/:id', (req, res) => {
  request
    .get(
      `${
        (process &&
          process.env &&
          process.env.REACT_APP_API_URL &&
          process.env.REACT_APP_API_URL.replace(/\/\s*$/, '')) ||
        'http://127.0.0.1:8080'
      }/prodex/api/attachments/${req.params.id}/download`,
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

// We store the access_token in memory - in production, store it in
// a secure persistent data store.
let ACCESS_TOKEN = null
let PUBLIC_TOKEN = null
let ITEM_ID = null

const plaidClient = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PLAID_PUBLIC_KEY,
  plaid.environments.sandbox //plaid.environments[process.env.NODE_ENV]
)

app.use(express.static('public'))
app.use(bodyParser.json())

//TODO get balance to FE
// Accept the public_token sent from Link
app.post('/get_access_token', function (request, response, next) {
  PUBLIC_TOKEN = request.body.public_token
  plaidClient.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + error)
      return response.json({ error: msg })
    }
    ACCESS_TOKEN = tokenResponse.access_token
    ITEM_ID = tokenResponse.item_id
    console.log('Access Token: ' + ACCESS_TOKEN)
    console.log('Item ID: ' + ITEM_ID)
    // Use Auth and pull account numbers for an Item
    plaidClient.getAuth(ACCESS_TOKEN, {}, (err, results) => {
      console.log('results====================================')
      console.log(JSON.stringify(results, 0, 2))
      console.log('====================================')
      //TODO Create a Dwolla processor token for a specific account id.
      //We have ERROR 400 because INVALID_PRODUCT. One of the account_id (s) specified is invalid or does not exist.
      plaidClient.createProcessorToken(ACCESS_TOKEN, results.accounts[0].account_id, 'dwolla', function (err, res) {
        console.log('res====================================')
        console.log(JSON.stringify(res, 0, 2))
        console.log('====================================')
        console.log('res====================================')
        console.log(JSON.stringify(err, 0, 2))
        console.log('====================================')
        //const processorToken = res.processor_token
      })
      // Handle err
      var accountData = results.accounts
      if (results.numbers.ach.length > 0) {
        // Handle ACH numbers (US accounts)
        var achNumbers = results.numbers.ach
      }
      if (results.numbers.eft.length > 0) {
        // Handle EFT numbers (Canadian accounts)
        var eftNumbers = results.numbers.eft
      }
      if (results.numbers.international.length > 0) {
        // Handle International numbers (Standard International accounts)
        var internationalNumbers = results.numbers.international
      }
      if (results.numbers.bacs.length > 0) {
        // Handle BACS numbers (British accounts)
        var bacsNumbers = results.numbers.bacs
      }
    })

    response.json({ error: false })
  })
})
