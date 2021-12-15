/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Dimmer, Loader, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { Dropdown, Button } from 'formik-semantic-ui-fixed-validation'
import { withDatagrid } from '../../../datagrid'
import { Formik } from 'formik'

// Components
import ErrorFocus from '../../../../components/error-focus'
import { Required } from '../../../../components/constants/layout'

// Actions
import * as Actions from '../../actions'

// Styles
import {
  CustomForm
} from './LinkCGPPopup.styles'

import { StyledModal } from '../../styles'

// Services
import {
  handleSearchChange,
  validationSchema,
  handleSubmit
} from './LinkCGPPopup.services'


const LinkCGPPopup = props => {
  // ! ! ? const prevVariable = usePrevious(props.variable)
  const [initialValues, setInitialValues] = useState({ companyGenericProduct: '' })

  const {
    popupValues,
    onClose,
    loading,
    searchedCompanyGenericProducts,
    searchCompanyGenericProductLoading,
    intl: { formatMessage }
  } = props

  // Similar to call componentDidMount:
  useEffect(async () => {
    //
    try {
      const { value } = await props.searchCompanyGenericProduct(popupValues.productName)
      if (value?.length === 1 && value[0].name === popupValues.productName) {
        setInitialValues({ companyGenericProduct: value[0].id })
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema()}
      onReset={() => onClose()}
      enableReinitialize
      onSubmit={(values, actions) => handleSubmit(values, actions, props)}
      loading={loading}
    >
      {formikProps => {
        let { setFieldValue, values, isSubmitting } = formikProps

        return (
          <CustomForm>
            <StyledModal size='small' closeIcon={false} onClose={() => onClose()} centered={true} open={true}>
              <Dimmer inverted active={loading || isSubmitting}>
                <Loader />
              </Dimmer>
              <Modal.Header style={{ textTransform: 'uppercase' }}>
                <FormattedMessage
                  id='operations.linkCompanyGenericProduct'
                  defaultMessage='Link Company Generic Product'
                />
              </Modal.Header>
              <Modal.Content>
                <Grid>
                  <GridRow>
                    <GridColumn width={16}>
                      <Dropdown
                        name='companyGenericProduct'
                        options={searchedCompanyGenericProducts}
                        label={
                          <>
                            {formatMessage({ id: 'productCatalog.selectProduct', defaultMessage: 'Select Product' })}
                            <Required />
                          </>
                        }
                        inputProps={{
                          fluid: true,
                          search: val => val,
                          defaultSearchQuery: popupValues.productName,
                          selection: true,
                          loading: searchCompanyGenericProductLoading,
                          onSearchChange: (_, { searchQuery }) => handleSearchChange(searchQuery, props),
                          placeholder: formatMessage({
                            id: 'productCatalog.typeToSearch',
                            defaultMessage: 'Type to Search...'
                          })
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                </Grid>
              </Modal.Content>
              <Modal.Actions>
                <Button basic onClick={() => onClose()} data-test='operations_link_company_generic_product_close_btn'>
                  <FormattedMessage id='global.close' defaultMessage='Close'>
                    {text => text}
                  </FormattedMessage>
                </Button>
                <Button.Submit
                  data-test='operations_link_company_generic_product_send_btn'
                  onClick={formikProps.handleSubmit}
                  disabled={isSubmitting}
                >
                  <FormattedMessage id='global.send' defaultMessage='Send'>
                    {text => text}
                  </FormattedMessage>
                </Button.Submit>
              </Modal.Actions>
            </StyledModal>
          </CustomForm>
        )
      }}
    </Formik>
  )
}

LinkCGPPopup.propTypes = {
  popupValues: PropTypes.object,
  onClose: PropTypes.func
}

LinkCGPPopup.defaultProps = {
  popupValues: null,
  onClose: () => { }
}

function mapStateToProps(store) {
  return {
    loading: store.operations.markRequestAsProcessedLoading,
    searchedCompanyGenericProducts: store.operations.searchedCompanyGenericProducts,
    searchCompanyGenericProductLoading: store.operations.searchCompanyGenericProductLoading,
  }
}
export default withDatagrid(injectIntl(connect(mapStateToProps, Actions)(LinkCGPPopup)))