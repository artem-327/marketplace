const express = require('express')
const next = require('next')
const routes = require('./routes')
const proxy = require('http-proxy-middleware')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = routes.getRequestHandler(nextApp)
const port = process.env.PORT || 3000

nextApp.prepare().then(() => {
  const app = express()

  app.use('/prodex', proxy({ target: process.env.REACT_APP_API_URL || 'hhtp://127.0.0.1:8080', changeOrigin: true }))

  app.use(handle).listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+port)
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})