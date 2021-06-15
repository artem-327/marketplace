import ProdexGrid from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import { FormattedMessage, injectIntl } from 'react-intl'

const CompanyProductTable = props => {
  const columns = [
    {
      name: 'intProductName',
      title: (
        <FormattedMessage id='operations.productInternalName' defaultMessage='Product Internal Name' />
      ),
      width: 250,
      sortPath: 'CompanyProduct.intProductName',
      allowReordering: false
    },
    {
      name: 'intProductCode',
      title: (
        <FormattedMessage id='operations.productInternalCode' defaultMessage='Product Internal Code' />
      ),
      width: 250,
      sortPath: 'CompanyProduct.intProductCode'
    },
    {
      name: 'owner',
      title: (
        <FormattedMessage id='operations.owner' defaultMessage='Owner' />
      ),
      width: 250,
      sortPath: 'CompanyProduct.companyGenericProduct.company.cfDisplayName'
    },
    {
      name: 'mapped',
      title: (
        <FormattedMessage id='operations.mapped' defaultMessage='Mapped' />
      ),
      width: 130,
      sortPath: 'CompanyProduct.companyGenericProduct.name'
    },
    {
      name: 'cfProductOfferCount',
      title: (
        <FormattedMessage id='operations.productOffersCnt' defaultMessage='Product Offers #' />
      ),
      align: 'right',
      width: 170,
      sortPath: 'CompanyProduct.cfProductOfferCount'
    }
  ]

  const getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        intProductName: <ActionCell row={row} content={row.intProductName} />
      }
    })
  }

  const { datagrid, rows, filterValue, loading, intl } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexGrid
        tableName='operations_company_product_catalog'
        {...datagrid.tableProps}
        filterValue={filterValue}
        columns={columns}
        rows={getRows(rows)}
        loading={datagrid.loading || loading}
        style={{ marginTop: '5px' }}
      />
    </div>
  )
}

export default injectIntl(CompanyProductTable)
