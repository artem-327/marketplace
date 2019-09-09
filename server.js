const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')
const fs = require('fs')
const axios = require('axios')
// const api  = require('./api')
const Cookie = require('js-cookie')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const port = process.env.PORT || 3000

const withAuth = (req, res, next) => {
  axios.interceptors.request.use((config) => {
    if (!config.headers['Authorization']) {
      console.log(req.headers, config.headers)
      // let accessToken = JSON.parse(`{${encodeURIComponent(req.headers.cookie.auth)}}`).access_token
      // console.log({ accessToken })
      // config.headers['Authorization'] = `Bearer ${accessToken}`
      
    }
    console.log(config.headers)
    return config
  })
  console.log('dafuq')
  next()
}

let downloadRouter = express()

downloadRouter.get('/attachments/:id', async (req, res) => {
  console.log(req.params, req.headers.cookie, typeof req.headers.cookie, Object.keys(req.headers), req.headers.Authorization)
  // let auth = Cookie.getJSON('auth')
  let auth = Cookie.getJSON()
  console.log({ axios, axios: typeof axios, auth })
  // console.log(JSON.parse(req.headers.cookie))
  res.sendFile('https://dev.echoexchange.net/prodex/api/attachments/${req.params.id}/download')
  // try {
  //   let { data } = await axios.get(`https://dev.echoexchange.net/prodex/api/attachments/${req.params.id}/download`)
  //   console.log(data)
  // } catch (e) {
  //   console.log(e)
  // }
})

nextApp.prepare().then(() => {
  const app = express()

  app.use('/download', withAuth, downloadRouter)
  app.use('/prodex', proxy({ target: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080', changeOrigin: true }))
  app.use(nextApp.getRequestHandler()).listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
  })
}).catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})