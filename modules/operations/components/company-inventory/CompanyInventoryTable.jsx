import ProdexGrid from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import { FormattedMessage, injectIntl } from 'react-intl'

const CompanyInventoryTable = props => {
  const columns = [
    {
      name: 'productName',
      title: (
        <FormattedMessage id='operations.productName' defaultMessage='Product Name' />
      ),
      sortPath: 'ProductOffer.companyProduct.intProductName',
      allowReordering: false
    },
    {
      name: 'productCode',
      title: (
        <FormattedMessage id='operations.productCode' defaultMessage='Product Code' />
      ),
      sortPath: 'ProductOffer.companyProduct.intProductCode'
    },
    {
      name: 'owner',
      title: (
        <FormattedMessage id='operations.owner' defaultMessage='Owner' />
      ),
      sortPath: 'ProductOffer.owner.cfDisplayName'
    },
    {
      name: 'complete',
      title: (
        <FormattedMessage id='operations.complete' defaultMessage='Complete' />
      )
      //sortPath: 'CompanyProduct.complete'
    },
    {
      name: 'broadcasted',
      title: (
        <FormattedMessage id='operations.broadcasted' defaultMessage='Broadcasted' />
      ),
      sortPath: 'ProductOffer.cfStatus'
    }
  ]

  const getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        productName: <ActionCell row={row} content={row.productName} />
      }
    })
  }

  const { datagrid, rows, filterValue, loading, intl } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexGrid
        tableName='operations_company_inventory'
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

export default injectIntl(CompanyInventoryTable)
