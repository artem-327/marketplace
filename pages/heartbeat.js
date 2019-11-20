import React, { Component } from 'react'
import { getVersion } from '~/modules/auth/api'

export default class Heartbeat extends Component {
  static async getInitialProps(ctx) {
    let body = null
    await getVersion()
      .then(({ version }) => {
        body = version
        ctx.res.writeHead(200)
      })
      .catch(() => ctx.res.writeHead(500))
      .finally(() => ctx.res.end(body))
  }
  render() {
    return null
  }
}
