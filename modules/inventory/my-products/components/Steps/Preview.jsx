import { useEffect } from 'react'
import _invert from 'lodash/invert'
import { FormattedMessage } from 'react-intl'
import { Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'
// Styles
import { SmallerTableCellSimple } from '../../../styles'

/**
 * Preview Component
 * @category Inventory - My Products
 * @components
 */
const Preview = props => {
  const filteredHeader =
    props.mappedHeader &&
    props.mappedHeader.filter(column => {
      return column.header
    })

  useEffect(() => {
    if (props.selectedSavedMap && !props.isSaveMapCSV) {
      ;(props.productOffer || props.companyGenericProduct || props.companies) &&
        props.dataHeaderCSV(props.selectedSavedMap)

      const data =
        filteredHeader &&
        filteredHeader.reduce(
          (prev, next) => {
            prev[next.header] = next.content
            return prev
          },
          {
            headerLine: true,
            mapName: props.mapName || 'Uno'
          }
        )

      if (props.companyGenericProduct)
        props.isSaveMapCSV &&
          data &&
          props.putCSVMapCompanyGenericProduct(props.selectedSavedMap.id, {
            ...data,
            mapName: props.mapName ? props.mapName : props.selectedSavedMap.mapName
          })
    } else {
      const data =
        filteredHeader &&
        filteredHeader.reduce(
          (prev, next) => {
            prev[next.header] = next.content
            return prev
          },
          {
            headerLine: true,
            mapName: props.mapName || 'Uno'
          }
        )
      data && props.dataHeaderCSV(data)

      if (props.selectedSavedMap) {
        // save edited maps
        if (props.companyGenericProduct)
          props.isSaveMapCSV &&
            data &&
            props.putCSVMapCompanyGenericProduct(props.selectedSavedMap.id, {
              ...data,
              mapName: props.mapName ? props.mapName : props.selectedSavedMap.mapName
            })

        if (props.productOffer)
          props.isSaveMapCSV &&
            data &&
            props.putCSVMapProductOffer(props.selectedSavedMap.id, {
              ...data,
              mapName: props.mapName ? props.mapName : props.selectedSavedMap.mapName
            })

        if (props.companies)
          props.isSaveMapCSV &&
            data &&
            props.putCSVMapCompanies(props.selectedSavedMap.id, {
              ...data,
              mapName: props.mapName ? props.mapName : props.selectedSavedMap.mapName
            })
      } else {
        // save new maps
        if (props.companyGenericProduct)
          props.isSaveMapCSV &&
            data &&
            props.postCSVMapCompanyGenericProduct({
              ...data,
              mapName: props.mapName
            })

        if (props.productOffer)
          props.isSaveMapCSV &&
            data &&
            props.postCSVMapProductOffer({
              ...data,
              mapName: props.mapName
            })

        if (props.companies)
          props.isSaveMapCSV &&
            data &&
            props.postCSVMapCompanies({
              ...data,
              mapName: props.mapName
            })
      }
    }
  }, [])

  const { CSV } = props

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
        {CSV?.bodyCSV?.map((row, i) => (
          <Table.Row key={i}>
            {row.columns.map(cell => {
              return (
                filteredHeader &&
                filteredHeader.map(
                  header =>
                    header.columnNumber === cell.columnNumber && (
                      <SmallerTableCellSimple key={cell.columnNumber}>{cell.content}</SmallerTableCellSimple>
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

Preview.propTypes = {
  mappedHeader: PropTypes.array,
  isSaveMapCSV: PropTypes.bool,
  productOffer: PropTypes.bool,
  companyGenericProduct: PropTypes.bool,
  companies: PropTypes.bool,
  mapName: PropTypes.string,
  dataHeaderCSV: PropTypes.func,
  putCSVMapCompanyGenericProduct: PropTypes.func,
  putCSVMapProductOffer: PropTypes.func,
  putCSVMapCompanies: PropTypes.func,
  postCSVMapCompanyGenericProduct: PropTypes.func,
  postCSVMapProductOffer: PropTypes.func,
  postCSVMapCompanies: PropTypes.func,
  selectedSavedMap: PropTypes.object,
  CSV: PropTypes.object
}

Preview.defaultProps = {
  mappedHeader: [],
  isSaveMapCSV: false,
  productOffer: false,
  companyGenericProduct: false,
  companies: false,
  mapName: '',
  dataHeaderCSV: () => {},
  putCSVMapCompanyGenericProduct: () => {},
  putCSVMapProductOffer: () => {},
  putCSVMapCompanies: () => {},
  postCSVMapCompanyGenericProduct: () => {},
  postCSVMapProductOffer: () => {},
  postCSVMapCompanies: () => {},
  selectedSavedMap: {},
  CSV: {}
}

export default Preview
