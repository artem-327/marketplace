import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
import ProductCatalogTable from './Table'
//Actions
import * as Actions from '../../actions'
import { downloadAttachment } from '../../../inventory/actions'
import { getSafe } from '../../../../utils/functions'


const mapStateToProps = ({ admin, productsAdmin }, { datagrid }) => {
    const editedId =
        (!!productsAdmin.currentAddForm || !!productsAdmin.currentEditForm) && productsAdmin.popupValues
        ? productsAdmin.popupValues.id
        : -1

    return {
        editedId,
        filterValue: productsAdmin.filterValue,
        rows: datagrid.rows.map(c => ({
        ...c,
        company: getSafe(() => c.company, [])
        }))
    }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, downloadAttachment })(ProductCatalogTable))
