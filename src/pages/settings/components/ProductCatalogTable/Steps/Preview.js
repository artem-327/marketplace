import React, { Component } from 'react'
import { connect } from 'react-redux'

class Preview extends Component {
  render() {
    return <React.Fragment>Hi im Preview page</React.Fragment>
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
