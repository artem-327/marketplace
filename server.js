const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  express()
    .use(handle)
    .listen(3001, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3001')
    })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})