import React, { Component } from 'react'
import { connect } from 'react-redux'

class ConfirmationPage extends Component {
  render() {
    return <div>Hello im ConfirmationPage</div>
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {
    mappedHeader: state.settings.mappedHeaders,
    CSV: state.settings.CSV
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationPage)
