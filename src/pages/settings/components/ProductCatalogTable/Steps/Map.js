import React, { Component } from 'react'
import { connect } from 'react-redux'

class Map extends Component {
  render() {
    return <React.Fragment>Hi im Map page</React.Fragment>
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
