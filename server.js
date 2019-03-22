const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const port = process.env.PORT || 3000

app.prepare()
.then(() => {
  express()
    .use(handle)
    .listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:'+port)
    })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})