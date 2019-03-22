const express = require('express')
const next = require('next')
const routes = require('./routes')
const proxy = require('express-http-proxy')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = routes.getRequestHandler(nextApp)
const port = process.env.PORT || 3000

nextApp.prepare()
.then(() => {
  const app = express()

  if (!process.env.REACT_APP_API_URL) app.use('/prodex', proxy('http://127.0.0.1:8080'))

  app.use(handle).listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:'+port)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})