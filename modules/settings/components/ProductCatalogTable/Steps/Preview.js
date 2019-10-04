import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

import { dataHeaderCSV, postCSVMapEchoProduct, postCSVMapProductOffer } from '../../../actions'
import _invert from 'lodash/invert'

class Preview extends Component {
  constructor(props) {
    const invertedSelectedSavedMap = _invert(props.selectedSavedMap)

    const filteredHeader =
      props.mappedHeader &&
      props.mappedHeader.filter(column => {
        return column.header
      })
    const filteredHeaderMap = props.selectedSavedMap && creatingFilteredHeader()

    function creatingFilteredHeader() {
      const mappedHeader = props.CSV.headerCSV.reduce((prev, curr) => {
        const valSelected = invertedSelectedSavedMap[curr.content]
        if (valSelected) {
          prev.push({ ...curr, header: curr.content })
        }
        return prev
      }, [])
      return mappedHeader
    }

    super(props)
    this.state = {
      filteredHeader: filteredHeaderMap || filteredHeader || null
    }
  }

  componentDidMount() {
    if (this.props.selectedSavedMap) {
      (this.props.productOffer || this.props.echoProduct) &&
        this.props.dataHeaderCSV(this.props.selectedSavedMap)
    } else {
      const data =
        this.state.filteredHeader &&
        this.state.filteredHeader.reduce(
          (prev, next) => {
            prev[next.header] = next.content
            return prev
          },
          {
            headerLine: true,
            mapName: this.props.mapName || 'Uno'
          }
        )
      data && this.props.dataHeaderCSV(data)

      if (this.props.echoProduct)
        this.props.isSaveMapCSV &&
          data &&
          this.props.postCSVMapEchoProduct({
            ...data,
            mapName: this.props.mapName
          })

      if (this.props.productOffer)
        this.props.isSaveMapCSV &&
        data &&
        this.props.postCSVMapProductOffer({
          ...data,
          mapName: this.props.mapName
        })
    }
  }

  render() {
    const { CSV } = this.props
    const { filteredHeader } = this.state

    return (
      <Table celled padded textAlign='center'>
        <Table.Header>
          <Table.Row>
            {filteredHeader &&
              filteredHeader.map(column => (
                <Table.HeaderCell key={column.columnNumber}>
                  {column.header}
                </Table.HeaderCell>
              ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {CSV.bodyCSV.map((row, i) => (
            <Table.Row key={i}>
              {row.columns.map(cell => {
                return (
                  filteredHeader &&
                  filteredHeader.map(
                    header =>
                      header.columnNumber === cell.columnNumber && (
                        <Table.Cell key={cell.columnNumber}>
                          {cell.content}
                        </Table.Cell>
                      )
                  )
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

const mapDispatchToProps = {
  dataHeaderCSV,
  postCSVMapEchoProduct,
  postCSVMapProductOffer
}

const mapStateToProps = state => {
  return {
    mappedHeader: state.settings.mappedHeaders,
    CSV: state.settings.CSV,
    isSaveMapCSV: state.settings.isSaveMapCSV,
    mapName: state.settings.mapName,
    selectedSavedMap: state.settings.selectedSavedMap
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
