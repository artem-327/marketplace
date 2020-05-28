import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup, getSafe } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { openPopup, deleteProductGroups } from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class ProductGroupsTable extends Component {
  state = {
    columns: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='product.groups.name' defaultMessage='Group Name'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'ProductGroup.name'
      },
      {
        name: 'tags',
        title: (
          <FormattedMessage id='product.groups.tagsName' defaultMessage='Tags Name'>
            {text => text}
          </FormattedMessage>
        )
      }
    ]
  }

  render() {
    const { intl, loading, rows, datagrid, filterValue, openPopup, deleteProductGroups, toastManager } = this.props

    const { formatMessage } = intl
    const { columns } = this.state
    return (
      <React.Fragment>
        <ProdexTable
          tableName={'product_group'}
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={columns}
          rows={rows}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openPopup(row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({
                    id: `confirm.delete.operations.tag.title`,
                    defaultMessage: `Delete`
                  }),
                  formatMessage(
                    {
                      id: `confirm.delete.product.groups.content`,
                      defaultMessage: `Do you really want to delete Product Group?`
                    },
                    { name: row.name }
                  )
                )
                  .then(() => {
                    deleteProductGroups(row.id)
                  })
                  .catch(err => {
                    console.error(err)
                  })
            }
          ]}
        />
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = {
  openPopup,
  deleteProductGroups
}
//TODO
const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map(row => ({
      ...row,
      tags: <ArrayToFirstItem values={row.tags ? row.tags.map(d => (d.name ? d.name : d)) : ''} rowItems={2} />
    })),
    filterValue: state.productsAdmin.filterValue,
    currentTab: state.productsAdmin.currentTab,
    loading: state.productsAdmin.loading
  }
}

export default withDatagrid(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(ProductGroupsTable)))
)
