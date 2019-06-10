import React, { Component } from "react"
import { connect } from "react-redux"

export class MapsTable extends Component {
  render() {
    return <div>hello this is Import Map page</div>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapsTable)
