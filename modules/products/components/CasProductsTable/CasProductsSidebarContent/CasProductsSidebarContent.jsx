/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import { GridRow, GridColumn } from 'semantic-ui-react'
import { Input, Button, Checkbox, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Required } from '../../../../../components/constants/layout'
import CasProductSection from '../CasProductSection/CasProductSection'

// Styles
import { GridStyled } from './CasProductsSidebarContent.styles'

// Actions
import { getHazardClassesDataRequest } from '../../../actions'

// Constants
import {
  GROUP_EPA,
  GROUP_RIGHT_TO_KNOW,
  GROUP_DHS_COI,
  GROUP_CA_PROP_65,
  GROUP_DEA,
  GROUP_REACH,
  GROUP_INTERNATIONAL,
  GROUP_OTHERS,
  PROPERTIES_FILTER
} from './CasProductsSidebarContent.constants'

const CasProductsSidebarContent = props => {
  const {
    intl: { formatMessage },
    formikProps
  } = props
  const { values } = formikProps

  // Similar to call componentDidMount:
  useEffect(() => {
    props.getHazardClassesDataRequest()
  }, [])  // If [] is empty then is similar as componentDidMount.

  const filter = values.propertiesFilter

  return (
    <div>
      <GridStyled>
        <GridRow>
          <GridColumn width={8} data-test='settings_branches_popup_name_inp'>
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
          </GridColumn>
          <GridColumn width={8}>
            <Dropdown
              label={<FormattedMessage id='global.propsFilter' defaultMessage='Properties Filter' />}
              options={PROPERTIES_FILTER}
              name='propertiesFilter'
              inputProps={{ 'data-test': 'cas_product_sidebar_properties_filter_drpdn' }}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width={16} data-test='cas_product_sidebar_index_name_inp'>
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
          </GridColumn>
        </GridRow>
      </GridStyled>

      {(filter === 'epa' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryEpa' defaultMessage='EPA' />}
          items={GROUP_EPA}
        />
      )}

      {(filter === 'rightToKnow' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryRightToKnow' defaultMessage='Right To Know' />}
          items={GROUP_RIGHT_TO_KNOW}
        />
      )}

      {(filter === 'dhsCoi' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryDhsCoi' defaultMessage='DHS COI' />}
          items={GROUP_DHS_COI}
          toggle={'cfChemicalOfInterest'}
          formikProps={formikProps}
        />
      )}

      {(filter === 'caProp65' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryCaProp65' defaultMessage='CA Prop 65' />}
          items={GROUP_CA_PROP_65}
          toggle={'caprop65'}
          formikProps={formikProps}
        />
      )}

      {(filter === 'dea' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryDea' defaultMessage='DEA' />}
          items={GROUP_DEA}
        />
      )}

      {(filter === 'reach' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryReach' defaultMessage='REACH' />}
          items={GROUP_REACH}
          toggle={'reach'}
          formikProps={formikProps}
        />
      )}

      {(filter === 'international' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryInternational' defaultMessage='International' />}
          items={GROUP_INTERNATIONAL}
        />
      )}

      {(filter === 'others' || filter === 'all') && (
        <CasProductSection
          label={<FormattedMessage id='global.regulatoryOthers' defaultMessage='Others' />}
          items={GROUP_OTHERS}
        />
      )}
    </div>
  )
}

CasProductsSidebarContent.propTypes = {}

CasProductsSidebarContent.defaultProps = {}

function mapStateToProps(store) {
  return {}
}

export default injectIntl(connect(mapStateToProps, { getHazardClassesDataRequest })(CasProductsSidebarContent))