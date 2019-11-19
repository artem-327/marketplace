import React from 'react'
import {connect} from 'react-redux'

import {Modal, FormGroup, Header, Dropdown as SDropdown, FormField, Search} from 'semantic-ui-react'

import {closeAddPopup, postNewCasProductRequest, updateCasProductRequest, getUnNumbersByString} from '../../actions'
import {Form, Input, Button, Dropdown, Field} from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import debounce from 'lodash/debounce'
import escapeRegExp from 'lodash/escapeRegExp'
import filter from 'lodash/filter'
import {CompanyProductInfo} from '~/modules/company-product-info'

import {withToastManager} from 'react-toast-notifications'
import {removeEmpty, generateToastMarkup} from '~/utils/functions'
import {FormattedMessage} from 'react-intl'

import {errorMessages} from '~/constants/yupValidation'

class AddEditCasProductsPopup extends React.Component {
  render() {
    const {
      closeAddPopup,
      popupValues,
      config,
      postNewCasProductRequest,
      updateCasProductRequest,
      toastManager
    } = this.props

    return (
      <CompanyProductInfo
        hiddenTabs={[2]}
        casProduct={popupValues}
        header={
          <Modal.Header>
            <FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`}>{text => text}</FormattedMessage>{' '}
            {config.addEditText}
          </Modal.Header>
        }
        contentWrapper={children => <Modal.Content>{children}</Modal.Content>}
        actionsWrapper={children => <Modal.Actions>{children}</Modal.Actions>}
        wrapper={<Modal closeIcon onClose={() => closeAddPopup()} open centered={false} />}
        onClose={closeAddPopup}
        readOnly={false}
        casProductOnly
        handleSubmit={async (values, formikProps) => {
          let {setSubmitting} = formikProps
          removeEmpty(values)

          if (popupValues) await updateCasProductRequest(popupValues.id, values.casProduct)
          else await postNewCasProductRequest(values.casProduct)

          let status = popupValues ? 'casProductUpdated' : 'casProductCreated'

          toastManager.add(
            generateToastMarkup(
              <FormattedMessage id={`notifications.${status}.header`} />,
              <FormattedMessage
                id={`notifications.${status}.content`}
                values={{name: values.casProduct.casIndexName}}
              />
            ),
            {
              appearance: 'success'
            }
          )

          setSubmitting(false)
        }}
      />
    )
  }
}

const mapDispatchToProps = {
  closeAddPopup,
  postNewCasProductRequest,
  updateCasProductRequest
}

const mapStateToProps = state => {
  let config = state.admin.config[state.admin.currentTab.name]
  return {
    config,
    popupValues: state.admin.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddEditCasProductsPopup))
