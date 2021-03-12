/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import { FormGroup, GridRow, Grid, GridColumn } from 'semantic-ui-react'
import { Input, Button, Checkbox, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Required } from '../../../../../components/constants/layout'
import CasProductSection from '../CasProductSection/CasProductSection'

// Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
} from './CasProductsSidebarContent.styles'
import {regulatoryFilter} from "../../../../company-product-info/constants" // ! !

const CasProductsSidebarContent = props => {
  const [tmp, set ] = useState(false)

  const {
    intl: { formatMessage },
    formikProps
  } = props
  const { values, propertiesFilter } = formikProps

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])

  console.log('!!!!!!!!!! CasProductsSidebarContent values', values)



  return (
    <div>
      <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
        <Input
          type='text'
          label={
            <>
              <FormattedMessage id='global.casNumber' defaultMessage='CAS Number' />
              <Required />
            </>
          }
          name='casNumber'
          inputProps={{
            placeholder: formatMessage({
              id: 'casProduct.enterCasNumber',
              defaultMessage: 'Enter CAS Number'
            })
          }}
        />
        <Dropdown
          label={<FormattedMessage id='global.propsFilter' defaultMessage='Properties Filter' />}
          options={[]}
          name='propertiesFilter'
          inputProps={{ 'data-test': 'admin_edit_unit_packaging_type_drpdn' }}
        />
      </FormGroup>
      <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
        <Input
          type='text'
          label={
            <>
              <FormattedMessage id='global.casIndexName' defaultMessage='CAS Index Name' />
              <Required />
            </>
          }
          name='casIndexName'
          inputProps={{
            placeholder: formatMessage({
              id: 'casProduct.enterCasName',
              defaultMessage: 'Enter CAS Name'
            })
          }}
        />
      </FormGroup>



      <CasProductSection/>
      <CasProductSection/>
    </div>
  )
}

CasProductsSidebarContent.propTypes = {
  itemsCount: PropTypes.number
}

CasProductsSidebarContent.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store) {
  return {

  }
}

export default injectIntl(CasProductsSidebarContent)
//export default injectIntl(connect(mapStateToProps, {  })(CasProductsSidebar))