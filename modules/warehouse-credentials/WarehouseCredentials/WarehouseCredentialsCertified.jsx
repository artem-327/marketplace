import { Component } from 'react'
import { connect } from 'react-redux'
import { withDatagrid } from '~/modules/datagrid'
import moment from 'moment'
import { debounce } from 'lodash'
// Services
import { injectIntl, FormattedMessage } from 'react-intl'
import ProdexTable from '../../../components/table'
import { postNewWarehouseRequest, putEditWarehouse } from '../../settings/actions'
import { downloadAttachment } from '../../inventory/actions'
import { getSafe, getMimeType, getFormattedAddress } from '../../../utils/functions'
import { getLocaleDateFormat } from '../../../components/date-format'
// Constants
import { columns, CONTENT_SUBCOLUMNS, INITIAL_VALUES, VALIDATION_SCHEME } from './WarehouseCredentials.constants'
// Components
import DetailRow from '../../../components/detail-row'
import { Popup, FormGroup, FormField, Input } from 'semantic-ui-react'
import BasicButton from '../../../components/buttons/BasicButton'
import { Required } from '../../../components/constants/layout'
import { Download, FileText, Map } from 'react-feather'
import { DivCustomRow } from '../../companies/components/TablesHandlers.styles'
// Styles
import {
  PositionHeaderSettings,
  IconDown,
  IconUp,
  CertificationLabel,
  CertHeader,
  Warehouse,
  FileName,
  EpaWrapper,
  FormArea,
  ButtonGroup
} from './WarehouseCredentials.styles'

class WarehouseCredentialsCertified extends Component {
  state = {
    expandedRowIds: [],
    expandedSubrowIds: [],
    formikData: {},
    filter: {}
  }

  componentDidMount() {
    if (getSafe(() => this.props.auth.identity.isAdmin, false))
      this.props.datagrid.loadData()
  }

  prepareLinkToAttachment = async (documentName, documentId) => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const mimeType = getMimeType(documentName)

    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    return element
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentName, documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  getRows = () => {
    const { rows } = this.props
    const { expandedSubrowIds } = this.state

    return rows.map(r => ({
      ...r,
      warehouseName: r.name,
      branches: r.branches.map(branch => ({
        ...branch,
        branchName: (
          <>
            {expandedSubrowIds.includes(branch.id) ? <IconUp /> : <IconDown />}
            {branch.deliveryAddress.cfName}
            {branch.deaListReceive && (
              <CertificationLabel className='certified'>
                <FormattedMessage id='warehouseCertifications.dea' defaultMessage='DEA' />
              </CertificationLabel>
            )}
            {branch.epaReceive && (
              <CertificationLabel className='certified'>
                <FormattedMessage id='warehouseCertifications.epa' defaultMessage='EPA' />
              </CertificationLabel>
            )}
            {branch.taxExemptReceive && (
              <CertificationLabel className='certified'>
                <FormattedMessage id='warehouseCertifications.dhl' defaultMessage='DHL' />
              </CertificationLabel>
            )}
          </>
        )
      }))
    }))
  }

  getRowDetail = ({ row }) => {
    return (
      <DetailRow
        row={row}
        items={row.branches.map(branch => {
          let ids = this.state.expandedSubrowIds.slice()
          return {
            ...branch,
            opened: ids.includes(branch.id)
          }
        })}
        contentAttributes={CONTENT_SUBCOLUMNS}
        separatedRows={true}
        renderSubDetail={this.renderSubDetail}
        hiddenDetailContentHeader={true}
        onDetailRowClick={branchId => {
          let ids = this.state.expandedSubrowIds.slice()
          if (ids.includes(branchId)) {
            this.setState({ expandedSubrowIds: ids.filter(id => id !== branchId) })
          } else {
            ids.push(branchId)
            this.setState({ expandedSubrowIds: ids })
          }
        }}
      />
    )
  }

  mergeInitialValues = (initialValues, stateValues) => {
    let mergedValues = {}
    for (let mainAttr in initialValues) {
      mergedValues[mainAttr] = {}
      if (stateValues[mainAttr]) {
        for (let subAttr in initialValues[mainAttr]) {
          if (stateValues[mainAttr][subAttr]) {
            mergedValues[mainAttr][subAttr] = stateValues[mainAttr][subAttr]
          } else {
            mergedValues[mainAttr][subAttr] = initialValues[mainAttr][subAttr]
          }
        }
      } else {
        mergedValues[mainAttr] = initialValues[mainAttr]
      }
    }

    return mergedValues
  }

  renderSubDetail = branch => {
    const {
      intl: { formatMessage }
    } = this.props
    const { formikData } = this.state
    let stateData = {}
    if (`${branch.id}` in formikData) stateData = formikData[branch.id]

    const mergedValues = this.mergeInitialValues(INITIAL_VALUES, stateData)

    return (
      <>
        {branch.deaListReceive && (
          <>
            <CertHeader>
              <FormattedMessage id='warehouseCredentials.deaCertificate' defaultMessage='DEA Certificate' />
            </CertHeader>
            <FileName
              onClick={e => {
                if (getSafe(() => branch.deaListCertificateFile.name, ''))
                  this.downloadAttachment(branch.deaListCertificateFile.name, branch.deaListCertificateFile.id)
              }}
              className={getSafe(() => branch.deaListCertificateFile.name, '') && 'clickable'}>
              <FileText />
              <label>
                <FormattedMessage id='warehouseCredentials.fileName' defaultMessage='File Name' />
              </label>
              {getSafe(() => branch.deaListCertificateFile.name, '')}

              <div>
                <label>
                  <FormattedMessage id='warehouseCredentials.issueDate' defaultMessage='Issue Date' />
                </label>
                {getSafe(() => moment(branch.deaListCertificateIssueDate).format(getLocaleDateFormat()), '')}
              </div>

              <div>
                <label>
                  <FormattedMessage id='warehouseCredentials.expDate' defaultMessage='Exp. Date' />
                </label>
                {getSafe(() => moment(branch.deaListCertificateExpireDate).format(getLocaleDateFormat()), '')}
              </div>

              <Download className='download' />
            </FileName>
          </>
        )}
        {branch.epaReceive && (
          <>
            <CertHeader>
              <FormattedMessage
                id='warehouseCredentials.epaCertificate'
                defaultMessage='EPA Certificate'
              />
            </CertHeader>
            <EpaWrapper
              onClick={e => {
                if (getSafe(() => branch.deaListCertificateFile.name, ''))
                  this.downloadAttachment(branch.deaListCertificateFile.name, branch.deaListCertificateFile.id)
              }}>
              <div>
                <label>
                  <FormattedMessage id='warehouseCredentials.frsId' defaultMessage='FRS ID' />
                </label>
                {getSafe(() => branch.epaFrsId, '')}
              </div>

              <div>
                <label>
                  <FormattedMessage id='warehouseCredentials.epaRegion' defaultMessage='EPA Region' />
                </label>
                {getSafe(() => branch.epaRegion, '')}
              </div>

              <div>
                <label>
                  <FormattedMessage id='warehouseCredentials.epaFacilityUrl' defaultMessage='Detailed Factory Report' />
                </label>
                {getSafe(() => branch.epaFacilityUrl, '')}
              </div>
            </EpaWrapper>
          </>
        )}
        {branch.taxExemptReceive && (
          <>
            <CertHeader>
              <FormattedMessage
                id='warehouseCredentials.taxExemptCertificate'
                defaultMessage='Tax Exempt Certificate'
              />
            </CertHeader>
            <Warehouse>
              <Map />
              <label>
                <FormattedMessage id='warehouseCredentials.warehouseAddress' defaultMessage='Warehouse Address' />
              </label>
              {getFormattedAddress({
                street: getSafe(() => branch.deliveryAddress.address.streetAddress, false),
                city: getSafe(() => branch.deliveryAddress.address.city, false),
                zip: getSafe(() => branch.deliveryAddress.address.zip.zip, false),
                country: getSafe(() => branch.deliveryAddress.address.country.name, false),
                province: getSafe(() => branch.deliveryAddress.address.province.name, false)
              })}
            </Warehouse>
            <FileName
              onClick={e => {
                if (getSafe(() => branch.taxExemptCertificateFile.name, ''))
                  this.downloadAttachment(branch.taxExemptCertificateFile.name, branch.taxExemptCertificateFile.id)
              }}
              className={getSafe(() => branch.taxExemptCertificateFile.name, '') && 'clickable'}>
              <FileText />
              <label>
                <FormattedMessage id='warehouseCredentials.fileName' defaultMessage='File Name' />
              </label>
              {getSafe(() => branch.taxExemptCertificateFile.name, '')}
              <Download className='download' />
            </FileName>
            <FormArea>
              <FormGroup widths='equal'>
                <FormField>
                  <label>
                    <FormattedMessage id='global.certificateNumber' defaultMessage='Certificate Number' />
                    <Required />
                  </label>
                  <Input disabled={true} value={branch.taxExemptCertificateNumber} name='taxExempt.certificateNumber' />
                </FormField>
                <FormField>
                  <label>
                    <FormattedMessage id='global.issueDate' defaultMessage='Issue Date' />
                    <Required />
                  </label>
                  <Input
                    disabled={true}
                    name='taxExempt.issueDate'
                    value={moment(branch.taxExemptCertificateIssueDate).format(getLocaleDateFormat())}
                  />
                </FormField>
                <FormField>
                  <label>
                    <FormattedMessage id='global.expDate' defaultMessage='Expiration Date' />
                    <Required />
                  </label>
                  <Input
                    disabled={true}
                    name='taxExempt.expDate'
                    value={moment(branch.taxExemptCertificateExpireDate).format(getLocaleDateFormat())}
                  />
                </FormField>
              </FormGroup>
            </FormArea>
          </>
        )}
      </>
    )
  }

  toggleCellComponent = ({ expanded, tableRow, row, style, ...restProps }) => {
    return (
      <td data-test='warehouse_toggle_column' className={`warehouse_opener ${expanded ? 'opened' : 'closed'}`}>
        {expanded ? <IconUp /> : <IconDown />}
      </td>
    )
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  handleFilterChangeInputSearch = (e, data) => {
    const filter = {
      ...this.state.filter,
      [data.name]: data.value
    }
    this.setState({ filter: filter })
    this.handleFiltersValue(filter)
  }

  render() {
    const {
      datagrid,
      intl: { formatMessage },
      rows
    } = this.props
    const filterValue = this.state.filter

    if (!getSafe(() => this.props.auth.identity.isAdmin, false))
      return <FormattedMessage id='global.accessDenied' defaultMessage='Access Denied!' />

    return (
      <>
        <PositionHeaderSettings>
          <DivCustomRow>
            <div>
              <div className='column'>
                <Input
                  style={{ width: 340 }}
                  icon='search'
                  name='searchInput'
                  placeholder={formatMessage({ id: 'warehouseCredentials.searchText', defaultMessage: 'Search...' })}
                  onChange={this.handleFilterChangeInputSearch}
                  value={filterValue && filterValue.searchInput ? filterValue.searchInput : ''}
                />
              </div>
            </div>
          </DivCustomRow>
        </PositionHeaderSettings>
        <div
          className={`flex stretched warehouse-credentials-wrapper${datagrid.rows.length ? '' : ' empty'}`}
          style={{ padding: '10px 30px' }}>
          <ProdexTable
            {...datagrid.tableProps}
            tableName='warehouse_credentials_grid'
            hideCheckboxes
            loading={datagrid.loading}
            columns={columns}
            rows={this.getRows()}
            rowDetailType={true}
            rowDetail={this.getRowDetail}
            onRowClick={(_, row) => {
              if (row.root && row.branches.length) {
                let ids = this.state.expandedRowIds.slice()
                if (ids.includes(row.id)) {
                  this.setState({ expandedRowIds: ids.filter(id => id !== row.id) })
                } else {
                  ids.push(row.id)
                  this.setState({ expandedRowIds: ids })
                }
              }
            }}
            expandedRowIds={this.state.expandedRowIds}
            onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}
            toggleCellComponent={this.toggleCellComponent}
            isToggleCellComponent={true}
            estimatedRowHeight={1500}
          />
        </div>
      </>
    )
  }
}

const mapDispatchToProps = {
  postNewWarehouseRequest,
  putEditWarehouse,
  downloadAttachment
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    auth: state.auth,
    rows: datagrid.rows.map(r => {
      return {
        ...r,
        rawData: r,
        root: true,
        id: r.id,
        user: r.name,
        description: r.name
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(WarehouseCredentialsCertified)))
