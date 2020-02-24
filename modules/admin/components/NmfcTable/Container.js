import Table from './Table'

import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { withDatagrid } from '~/modules/datagrid'

import { deleteNmfcNumber, openEditPopup } from '~/modules/admin/actions'

const mapDispatchToProps = { deleteNmfcNumber, openEditPopup }

const mapStateToProps = ({ admin }) => ({ admin, config: admin.config[admin.currentTab.name] })

export default connect(mapStateToProps, mapDispatchToProps)(withDatagrid(withToastManager(injectIntl(Table))))
