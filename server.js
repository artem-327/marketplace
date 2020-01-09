const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const port = process.env.PORT || 3000
const cookieParser = require('cookie-parser')
const request = require('request')

let downloadRouter = express()

downloadRouter.get('/attachments/:id', (req, res) => {
  request
    .get(`${(process && process.env && process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.replace(/\/\s*$/, "")) || 'http://127.0.0.1:8080'}/prodex/api/attachments/${req.params.id}/download`, {
      auth: {
        bearer: JSON.parse(req.cookies.auth).access_token
      }
    })
    .pipe(res)
})

nextApp
  .prepare()
  .then(() => {
    const app = express()
    app.use(cookieParser())
    app.use('/download', downloadRouter)
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
