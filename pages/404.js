import React, { Component } from 'react'
import Router from 'next/router'
import { getSafe } from '../utils/functions'
import { LINK_TRANSLATE_TABLE } from '../utils/constants'

export default class Custom404 extends Component {
  state = {
    redirecting: true
  }

  componentDidMount() {
    const requiredPath = getSafe(() => Router.router.asPath, '')
    const pathName = requiredPath.split('?')

    if (pathName && pathName[0] && LINK_TRANSLATE_TABLE[pathName[0]]) {
      const params = requiredPath.substring(pathName[0].length)
      Router.push(`${LINK_TRANSLATE_TABLE[pathName[0]]}${params}`)
      return null
    } else {
      this.setState({ redirecting: false })
    }
  }

  render() {
    return (this.state.redirecting ? null : <h1>404 - Page Not Found</h1>)
  }
}



