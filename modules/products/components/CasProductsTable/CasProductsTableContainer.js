import { connect } from 'react-redux'
import { Popup, Label } from 'semantic-ui-react'
import CasProductsTable from './CasProductsTable'
import {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
} from '../../actions'
import { withDatagrid } from '../../../datagrid'

const transformHazardClasses = classes => {
    if (!classes || !classes.length) return
    return (
      <Label.Group color='blue'>
        {classes.map((b, i) => (
          <Popup
            key={i}
            content={b.description}
            trigger={
              <Label size='tiny'>
                {b.classCode}
              </Label>
            }
          />
        ))}
      </Label.Group>
    )
}

const mapDispatchToProps = {
    openPopup,
    openEditAltNamesCasPopup,
    closeConfirmPopup,
    getHazardClassesDataRequest,
    getPackagingGroupsDataRequest,
    deleteCasProduct
}

const mapStateToProps = (state, { datagrid }) => {
    return {
        editedId: state.productsAdmin.editedId,
        rows: datagrid.rows.map(d => {
        return {
            ...d,
            hazardClassesLabeled: transformHazardClasses(d.hazardClasses)
        }
        })
    }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(CasProductsTable))