import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

import { dataHeaderCSV, postCSVMapEchoProduct, putCSVMapEchoProduct, postCSVMapProductOffer, putCSVMapProductOffer } from '../../../actions'
import _invert from 'lodash/invert'
import { FormattedMessage } from 'react-intl'

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
      // commented filteredHeaderMap - not found reason to use it - broken data when saving changed map
      filteredHeader: /*filteredHeaderMap ||*/ filteredHeader || null
    }
  }

  componentDidMount() {
    if (this.props.selectedSavedMap && !this.props.isSaveMapCSV) {
      (this.props.productOffer || this.props.echoProduct) &&
        this.props.dataHeaderCSV(this.props.selectedSavedMap)

      if (this.props.echoProduct)
        this.props.isSaveMapCSV &&
        data &&
        this.props.putCSVMapEchoProduct(this.props.selectedSavedMap.id, {
          ...data,
          mapName: this.props.mapName ? this.props.mapName : this.props.selectedSavedMap.mapName
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
                  <FormattedMessage id={`global.${column.header.replace(/Mapper$/gi, '')}`} defaultMessage={column.content} />
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
  putCSVMapEchoProduct,
  postCSVMapProductOffer,
  putCSVMapProductOffer
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
