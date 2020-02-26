import React from 'react'
import { connect } from 'react-redux'

import { Modal } from 'semantic-ui-react'

import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest } from '../../actions'
import { Field } from 'formik-semantic-ui-fixed-validation'
import { CompanyProductInfo } from '~/modules/company-product-info'

import { removeEmpty } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

import { errorMessages } from '~/constants/yupValidation'

class AddEditCasProductsPopup extends React.Component {
  render() {
    const {
      closeAddPopup,
      popupValues,
      config,
      postNewCasProductRequest,
      updateCasProductRequest,
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
          let { setSubmitting } = formikProps
          removeEmpty(values)

          if (popupValues) await updateCasProductRequest(popupValues.id, values.casProduct)
          else await postNewCasProductRequest(values.casProduct)

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

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCasProductsPopup)
