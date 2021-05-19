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
import { makeGetEditedId } from '../../selectors'

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

const makeMapStateToProps = () => {
  const getEditedId = makeGetEditedId()
  const mapStateToProps = (state, { datagrid }) => {
    return {
      editedId: getEditedId(state),
      rows: datagrid.rows.map(d => {
        return {
          ...d,
          hazardClassesLabeled: transformHazardClasses(d.hazardClasses)
        }
      })
    }
  }
  return mapStateToProps
}


export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(CasProductsTable))