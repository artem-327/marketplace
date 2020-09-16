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
import { ArrayToFirstItem } from '~/components/formatted-messages/'

class ProductGroupsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='product.groups.name' defaultMessage='Group Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'ProductGroup.name',
          actions: this.getActions()
        },
        {
          name: 'tags',
          title: (
            <FormattedMessage id='product.groups.tags' defaultMessage='Tags'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'marketSegments',
          title: (
            <FormattedMessage id='product.groups.marketSegments' defaultMessage='Market Segment'>
              {text => text}
            </FormattedMessage>
          )
        }
      ]
    }
  }

  getActions = () => {
    const { intl, openPopup, deleteProductGroups, datagrid } = this.props

    const { formatMessage } = intl
    return [
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
          ).then(async () => {
            try {
              await deleteProductGroups(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        disabled: row => this.props.editedId === row.id,
      }
    ]
  }

  render() {
    const {
      intl,
      loading,
      rows,
      datagrid,
      filterValue,
      openPopup,
      deleteProductGroups,
      editedId,
      toastManager
    } = this.props

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
          columnActions='name'
          editingRowId={editedId}
        />
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = {
  openPopup,
  deleteProductGroups
}

const mapStateToProps = (state, { handleFilterChange, datagrid }) => {
  return {
    rows: datagrid.rows.map(row => ({
      ...row,
      rawData: row,
      tags: (
        <ArrayToFirstItem
          values={row.tags ? row.tags.map(d => (d.name ? d.name : d)) : ''}
          rowItems={3}
          ids={row.tags ? row.tags.map(d => (d.id ? d.id : d)) : ''}
          tags={true}
          onTagClick={handleFilterChange}
        />
      ),
      marketSegments: (
        <ArrayToFirstItem
          values={row.marketSegments ? row.marketSegments.map(d => (d.name ? d.name : d)) : ''}
          rowItems={3}
          ids={row.marketSegments ? row.marketSegments.map(d => (d.id ? d.id : d)) : ''}
          tags={true}
          onTagClick={handleFilterChange}
        />
      )
    })),
    filterValue: state.productsAdmin.filterValue,
    currentTab: state.productsAdmin.currentTab,
    editedId: state.productsAdmin.editedId,
    loading: state.productsAdmin.loading
  }
}

export default withDatagrid(
  connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(ProductGroupsTable)))
)
