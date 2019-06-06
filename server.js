const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const port = process.env.PORT || 3000

nextApp.prepare().then(() => {
  const app = express()

  app.use('/prodex', proxy({ target: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080', changeOrigin: true }))

  app.use(nextApp.getRequestHandler()).listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+port)
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})