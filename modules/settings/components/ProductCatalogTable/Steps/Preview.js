import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

import {
  dataHeaderCSV,
  postCSVMapEchoProduct,
  putCSVMapEchoProduct,
  postCSVMapProductOffer,
  putCSVMapProductOffer,
  postCSVMapCompanies,
  putCSVMapCompanies
} from '../../../actions'
import _invert from 'lodash/invert'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const SmallerTableCell = styled(Table.Cell)`
  font-size: 0.8em;
`

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
      ;(this.props.productOffer || this.props.echoProduct || this.props.companies) &&
        this.props.dataHeaderCSV(this.props.selectedSavedMap)

      if (this.props.echoProduct)
        this.props.isSaveMapCSV &&
          data &&
          this.props.putCSVMapEchoProduct(this.props.selectedSavedMap.id, {
            ...data,
            mapName: this.props.mapName ? this.props.mapName : this.props.selectedSavedMap.mapName
          })
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

      if (this.props.selectedSavedMap) {
        // save edited maps
        if (this.props.echoProduct)
          this.props.isSaveMapCSV &&
            data &&
            this.props.putCSVMapEchoProduct(this.props.selectedSavedMap.id, {
              ...data,
              mapName: this.props.mapName ? this.props.mapName : this.props.selectedSavedMap.mapName
            })

        if (this.props.productOffer)
          this.props.isSaveMapCSV &&
            data &&
            this.props.putCSVMapProductOffer(this.props.selectedSavedMap.id, {
              ...data,
              mapName: this.props.mapName ? this.props.mapName : this.props.selectedSavedMap.mapName
            })

        if (this.props.companies)
          this.props.isSaveMapCSV &&
            data &&
            this.props.putCSVMapCompanies(this.props.selectedSavedMap.id, {
              ...data,
              mapName: this.props.mapName ? this.props.mapName : this.props.selectedSavedMap.mapName
            })
      } else {
        // save new maps
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

        if (this.props.companies)
          this.props.isSaveMapCSV &&
            data &&
            this.props.postCSVMapCompanies({
              ...data,
              mapName: this.props.mapName
            })
      }
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
                  <FormattedMessage
                    id={`global.${column.header.replace(/Mapper$/gi, '')}`}
                    defaultMessage={column.content}
                  />
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
                        <SmallerTableCell key={cell.columnNumber}>{cell.content}</SmallerTableCell>
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
  putCSVMapProductOffer,
  postCSVMapCompanies,
  putCSVMapCompanies
}

const mapStateToProps = state => {
  return {
    mappedHeader: state.settings.mappedHeaders,
    CSV: state.settings.CSV,
    isSaveMapCSV: state.settings.isSaveMapCSV,
    mapName: state.settings.mapName,
    selectedSavedMap: state.settings.selectedSavedMap,
    csvWithoutHeader: state.settings.csvWithoutHeader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview)
