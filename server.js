const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser')
const request = require('request')
const axios = require('axios')

let router = express()
const app = express()

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
