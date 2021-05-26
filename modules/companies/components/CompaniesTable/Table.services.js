import { Checkbox } from 'semantic-ui-react'
import { RefreshCw } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import Router from 'next/router'

import { ArrayToFirstItem } from '~/components/formatted-messages/'
import ActionCell from '~/components/table/ActionCell'

import { StyledReRegisterButton } from './Table.styles'

import confirm from '~/components/Confirmable/confirm'

export const getRows = (rows, state, props) => {
  return rows.map(row => {
    return {
      ...row,
      associations: <ArrayToFirstItem values={row.associations ? row.associations.map(r => r.name) : []} />,
      companyName: (
        <ActionCell
          row={row}
          getActions={() => getActions(props)}
          content={row.companyName}
          onContentClick={() => props.openEditCompany(row.id, row.rawData)}
        />
      ),
      paymentAccountStatus:
        row.paymentProcessor === 'DWOLLA'
          ? row.hasDwollaAccount
          ? 'Dwolla'
          : 'No'
          : row.hasVellociAccount
          ? 'Velloci'
          : 'No',
      reviewRequested: (
        <Checkbox
          key={`review${row.id}`}
          toggle={true}
          defaultChecked={row.reviewRequested}
          onClick={() => props.reviewRequest(row, props.datagrid)}
          data-test={`admin_company_table_${row.id}_chckb`}
        />
      ),
      enabled: (
        <Checkbox
          key={`enabled${row.id}`}
          toggle={true}
          defaultChecked={row.enabled}
          onClick={() => handleEnabled(row.rawData, props)}
          data-test={`admin_company_table_enable_${row.id}_chckb`}
        />
      ),
      p44CompanyId: row.p44CompanyId ? (
        <div style={{ display: 'flex' }}>
          <div style={{ width: '100%' }}>{row.p44CompanyId}</div>
          <StyledReRegisterButton
            onClick={() => {
              state.setReRegisterCompanyId(row.id)
              reRegisterP44(row.id, state, props)
            }}
            loading={props.reRegisterP44Pending && state.reRegisterCompanyId === row.id}
            disabled={state.reRegisterCompanyId === row.id}>
            <RefreshCw size={18} style={{ color: '#2599d5' }} />
          </StyledReRegisterButton>
        </div>
      ) : (
        row.p44CompanyId
      )
    }
  })
}

const handleEnabled = async (row, props) => {
  const { datagrid, udpateEnabled } = props

  try {
    await udpateEnabled(row.id, !row.enabled)
    datagrid.updateRow(row.id, () => ({ ...row, enabled: !row.enabled }))
  } catch (err) {
    console.error(err)
  }
}

const reRegisterP44 = async (id, state, props) => {
  const { datagrid, reRegisterP44 } = props
  try {
    const { value } = await reRegisterP44(id)
    state.setReRegisterCompanyId(null)
    datagrid.updateRow(id, () => value)
  } catch (err) {
    console.error(err)
  }
}

const getActions = props => {
  const { datagrid, openEditCompany, deleteCompany, takeOverCompany, resendWelcomeEmail, intl } = props

  const { formatMessage } = intl
  return [
    {
      text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
      callback: row => openEditCompany(row.id, row.rawData)
    },
    {
      text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
      callback: row =>
        confirm(
          formatMessage({ id: 'confirm.deleteCompany.title', defaultMessage: 'Delete Company?' }),
          formatMessage(
            {
              id: 'confirm.deleteCompany.content',
              defaultMessage: `Do you really want to delete '${row.name}' company?`
            },
            { name: row.name }
          )
        ).then(async () => {
          try {
            await deleteCompany(row.id)
            datagrid.removeRow(row.id)
          } catch (err) {
            console.error(err)
          }
        }),
      disabled: row => props.editedId === row.id
    },
    {
      text: formatMessage({
        id: 'admin.registerToPaymentProcessor',
        defaultMessage: 'Register to Payment Processor'
      }),
      callback: async row => {
        row.paymentProcessor === 'DWOLLA'
          ? !row.hasDwollaAccount && Router.push(`/admin/dwolla-register?companyId=${row.id}`)
          : !row.hasVellociAccount && Router.push(`/admin/onboarding?companyId=${row.id}`)
      },
      hidden: row => row.hasDwollaAccount || row.hasVellociAccount
    },
    {
      text: <FormattedMessage id='admin.takeOver' defaultMessage='Take-over as Company Admin' />,
      callback: row => takeOverCompany(row.id),
      hidden: row => !row.primaryUser
    },
    {
      text: <FormattedMessage id='admin.resendWelcomeEmail' defaultMessage='Resend Welcome Email' />,
      callback: async row => {
        const { value } = await resendWelcomeEmail(row.primaryUser.id)
      },
      hidden: row => !row.reviewRequested || !row.primaryUser
    }
  ]
}