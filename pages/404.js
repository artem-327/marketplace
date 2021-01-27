import React, { Component } from 'react'
import Router from 'next/router'
import { getSafe } from '../utils/functions'
import { LINK_TRANSLATE_TABLE } from '../utils/constants'

export default class Custom404 extends Component {
  state = {
    redirecting: true
  }

  componentDidMount() {
    const asPath = getSafe(() => Router.router.asPath, '')
    const path = asPath.split('?')
    const newPathName = path && path[0] && LINK_TRANSLATE_TABLE[path[0]]
      ? LINK_TRANSLATE_TABLE[path[0]]
      : ''

    if (newPathName && (newPathName !== path[0])) {
      const params = asPath.substring(path[0].length)
      Router.push(`${newPathName}${params}`)
      return null
    } else {
      this.setState({ redirecting: false })
    }
  }

  render() {
    return (this.state.redirecting ? null : <h1>404 - Page Not Found</h1>)
  }
}



