import { useState, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
import { debounce } from 'lodash'
//Components
import { withDatagrid } from '../../datagrid'
import BasicButton from '../../../components/buttons/BasicButton'
import InviteModal from './InviteModal/InviteModal'
import BluePalletModal from './BluePalletModal/BluePalletModal'
//Styles
import { ContainerCustom, InputSearch, DropdownType, DivButon } from '../MyNetwork.styles'
//Constants
import { NETWORK_TYPES } from '../constants'
import { Key } from 'react-feather'
//Actions
import { triggerModal, search, buttonActionsDetailRow, hideBluePallet } from '../actions'
//Services
import { getRowDetail } from '../MyNetwork.services'

/**
 * Shows input and dropdown for search connection or filter by type of connectin
 * @category My Network
 * @component
 */
const TableHandler = props => {
  const [searchValue, setSearchValue] = useState('')
  const [networkStatus, setNetworkStatus] = useState('')
  const debounceSetQuery = useCallback(
    debounce((val, key) => props?.datagrid?.setQuery({ [key]: val }), 500),
    []
  )

  const status = props?.datagrid?.query?.status

  useEffect(() => {
    if (status !== networkStatus) {
      setNetworkStatus(status)
    }
  }, [status, networkStatus, setNetworkStatus])

  return (
    <>
      <InputSearch
        fluid
        icon='search'
        name='searchInput'
        value={searchValue}
        placeholder={props?.intl?.formatMessage({
          id: 'myNetworks.search',
          defaultMessage: 'Search your connection'
        })}
        onChange={(event, data) => {
          setSearchValue(data?.value)
          debounceSetQuery(data?.value, 'companyName')
        }}
      />

      {/* <DropdownType
        name='networkStatus'
        value={networkStatus}
        placeholder={props?.intl?.formatMessage({
          id: 'myNetworks.filterByType',
          defaultMessage: 'Filter by type'
        })}
        selection
        options={NETWORK_TYPES}
        onChange={(event, data) => {
          setNetworkStatus(data?.value)
          props?.datagrid?.setQuery({ status: data?.value })
        }}
      /> */}
      <InviteModal
        onClose={props?.triggerModal}
        open={props?.isOpenModal}
        search={props?.search}
        isError={props?.isError}
        loading={props?.loading}
        detailCompany={props?.detailCompany}
        buttonActionsDetailRow={props?.buttonActionsDetailRow}
      />
      {
        props?.bluePalletModal &&
        <BluePalletModal
          onClose={props?.hideBluePallet}
        />
      }
      <DivButon>
        <BasicButton float='right !important' onClick={() => props?.triggerModal()}>
          <FormattedMessage id='global.invite' defaultMessage='Invite' />
        </BasicButton>
      </DivButon>
    </>
  )
}

TableHandler.propTypes = {
  datagrid: PropTypes.object,
  triggerModal: PropTypes.func,
  search: PropTypes.func,
  isOpenModal: PropTypes.bool,
  isError: PropTypes.bool,
  loading: PropTypes.bool
}
TableHandler.defaultProps = {
  datagrid: null,
  triggerModal: () => {},
  search: () => {},
  isOpenModal: false,
  isError: false,
  loading: false
}

const mapStateToProps = ({ myNetwork }) => ({
  isOpenModal: myNetwork?.isOpenModal,
  isError: myNetwork?.isError,
  loading: myNetwork?.loading,
  detailCompany: getRowDetail(myNetwork?.companyNetworkConnection),
  bluePalletModal: myNetwork?.bluePalletModal
})

export default withDatagrid(
  connect(mapStateToProps, { triggerModal, search, buttonActionsDetailRow, hideBluePallet })(injectIntl(TableHandler))
)
