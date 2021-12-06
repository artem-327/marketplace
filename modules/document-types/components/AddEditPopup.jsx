/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, FormGroup } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'

// Components
import { Required } from '../../../components/constants/layout'
import ErrorFocus from '../../../components/error-focus'

// Services
import { getSafe, removeEmpty } from '../../../utils/functions'
import { closePopup, editDocumentType, addDocumentType, getDocumentTypeGroupsByName } from '../actions'
import { withDatagrid } from '../../datagrid'
import { uniqueArrayByKey } from '../../../utils/functions'

const formValidation = Yup.object().shape({
  name: Yup.string().trim().min(1, 'Too short').required('Required')
})

const AddEditDocumentType = props => {
  const {
    closePopup,
    popupValues,
    editDocumentType,
    addDocumentType,
    datagrid,
    documentGroups,
    intl: { formatMessage },
  } = props

  const [selectedGroupOption, setSelectedGroupOption] = useState(null)

  useEffect(() => {
    const { popupValues } = props
    if (popupValues?.groups) {
      setSelectedGroupOption({
        text: popupValues.groups.name,
        value: popupValues.groups.id,
        key: popupValues.groups.id
      })
    }
  }, [])


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])

  let allGroups = []
  if (selectedGroupOption) {
    allGroups = uniqueArrayByKey(documentGroups.concat([selectedGroupOption]), 'key')
  } else {
    allGroups = documentGroups
  }

  return (
    <Modal closeIcon onClose={() => closePopup()} open centered={false}>
      <Modal.Header>
        {popupValues
          ? <FormattedMessage id='admin.editDocumentType' defaultMessage='Edit Document Type' />
          : <FormattedMessage id='admin.addDocumentType' defaultMessage='Add Document Type' />
        }
      </Modal.Header>
      <Modal.Content>
        <Form
          initialValues={{
            name: popupValues ? popupValues.name : '',
            group: popupValues?.group ? popupValues.group.id : ''
          }}
          validationSchema={formValidation}
          onReset={closePopup}
          onSubmit={async (values, { setSubmitting }) => {
            let data = {
              name: values.name.trim(),
              group: values.group
            }
            removeEmpty(data)

            try {
              if (popupValues) {
                const { value } = await editDocumentType(popupValues.id, data)
                datagrid.updateRow(popupValues.id, () => value)
              } else {
                await addDocumentType(data)
                datagrid.loadData()
              }
              closePopup()
            } catch (e) {
              console.error(e)
            } finally {
              setSubmitting(false)
            }
          }}>
          <FormGroup widths='equal' data-test={`admin_edit_document_type_name_input`}>
            <Input
              type='text'
              label={
                <>
                  <FormattedMessage id='global.name' defaultMessage='Name' />
                  <Required />
                </>
              }
              name='name'
            />
            <Dropdown
              name='group'
              label={<FormattedMessage id='global.documentTypeGroup' defaultMessage='Document Type Group' />}
              options={allGroups}
              inputProps={{
                placeholder: formatMessage({ id: 'admin.searchDocumentGroup', defaultMessage: 'Search document group' }),
                loading: props.documentGroupsLoading,
                minCharacters: 1,
                icon: 'search',
                fluid: true,
                search: true,
                selection: true,
                clearable: true,
                onSearchChange: (e, { searchQuery }) => {
                  searchQuery.length > 0 && props.getDocumentTypeGroupsByName(searchQuery)
                },
                'data-test': 'admin_edit_document_type_document_group_dropdown'
              }}
            />
          </FormGroup>

          <div style={{ textAlign: 'right' }}>
            <Button.Reset data-test={`admin_edit_documentType_cancel_btn`}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                {text => text}
              </FormattedMessage>
            </Button.Reset>
            <Button.Submit
              disabled={popupValues ? !popupValues.editable : false}
              data-test={`admin_edit_documentType_save_btn`}
            >
              <FormattedMessage id='global.save' defaultMessage='Save'>
                {text => text}
              </FormattedMessage>
            </Button.Submit>
          </div>
          <ErrorFocus />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

AddEditDocumentType.propTypes = {
  popupValues: PropTypes.object,
  documentGroupsLoading: PropTypes.bool,
  documentGroups: PropTypes.array
}

AddEditDocumentType.defaultProps = {
  popupValues: null,
  documentGroupsLoading: false,
  documentGroups: [],
}

const mapDispatchToProps = { closePopup, editDocumentType, addDocumentType, getDocumentTypeGroupsByName }

function mapStateToProps(store) {
  return {
    popupValues: store.documentTypes.popupValues,
    documentGroupsLoading: store.documentTypes.documentGroupsLoading,
    documentGroups: store.documentTypes.documentGroups
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(AddEditDocumentType)))