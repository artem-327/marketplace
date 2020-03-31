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
        )
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
                  .then(() => deleteTag(row.id))
                  .catch(err => {
                    //TODO delete when ednpoints will exist
                    toastManager.add(
                      generateToastMarkup(
                        <FormattedMessage id={`notifications.error`} defaultMessage='Error' />,
                        <FormattedMessage
                          id={`notifications.error`}
                          defaultMessage='Endpoint delete tag does not exist yet.'
                        />
                      ),
                      { appearance: 'error' }
                    )
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

//TODO missing endpoints datagrid fixed rows
const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: [{ id: 1, name: 'Test' }], //datagrid.rows,
    filterValue: state.operations.filterValue,
    currentTab: state.operations.currentTab,
    loading: state.operations.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(TagsTable))))
