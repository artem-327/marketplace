import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

import { generateToastMarkup, getSafe } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import { openPopup, deleteTag } from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class TagsTable extends Component {
  state = {
    columns: [
      {
        name: 'name',
        title: (
          <FormattedMessage id='operations.tagName' defaultMessage='Tag Name'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'Tag.name'
      }
    ]
  }

  render() {
    const { intl, loading, rows, datagrid, filterValue, openPopup, deleteTag, toastManager } = this.props

    const { formatMessage } = intl
    const { columns } = this.state
    return (
      <React.Fragment>
        <ProdexTable
          tableName={'operations_tag'}
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
                      id: `confirm.delete.operations.tag.content`,
                      defaultMessage: `Do you really want to delete tag?`
                    },
                    { name: row.name }
                  )
                )
                  .then(() => {
                    deleteTag(row.id)
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
  deleteTag
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows,
    filterValue: state.operations.filterValue,
    currentTab: state.operations.currentTab,
    loading: state.operations.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(TagsTable))))
