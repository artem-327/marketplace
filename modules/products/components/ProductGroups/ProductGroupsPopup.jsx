import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, FormGroup, Header } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button, Dropdown as FormikDropdown } from 'formik-semantic-ui-fixed-validation'
import debounce from 'lodash/debounce'
// Components
import { Required } from '../../../../components/constants/layout'
import ErrorFocus from '../../../../components/error-focus'
// Services
import { generateToastMarkup, getSafe, uniqueArrayByKey } from '../../../../utils/functions'
import { withDatagrid } from '../../../datagrid'
import { productGroupsPoprupFormValidation } from '../../services'
// Hooks
import { usePrevious } from '../../../../hooks'

/**
 * @Component
 * @category Products - Components / ProductGroups / ProductGroupsPopup
 */
const ProductGroupsPopup = props => {
  const [selectedTagsOptions, setSelectedTagsOptions] = useState([])
  const prevPopupValues = usePrevious(props.popupValues)

  useEffect(() => {
    if (prevPopupValues !== props.popupValues) {
      setSelectedTagsOptions(
        getSafe(() => props.popupValues.rawData.tags, []).map(d => {
          return {
            key: d.id,
            text: d.name,
            value: d.id
          }
        })
      )
    }
  }, [props.popupValues])

  const handleTagsSearchChange = debounce((_, { searchQuery }) => {
    props.searchTags(searchQuery)
  }, 500)

  const handleTagsChange = (value, options) => {
    const newOptions = options.filter(el => value.some(v => el.value === v))
    setSelectedTagsOptions(newOptions)
  }

  const {
    closePopup,
    popupValues,
    rowId,
    putProductGroups,
    postProductGroups,
    intl: { formatMessage },
    datagrid,
    searchedTags,
    searchedTagsLoading,
    searchedMarketSegmentsLoading
  } = props

  const initialFormValues = {
    name: getSafe(() => popupValues.name, ''),
    tags: getSafe(() => popupValues.tags.props.ids, '')
  }

  const allTagsOptions = uniqueArrayByKey(searchedTags.concat(selectedTagsOptions), 'key')

  return (
    <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
      <Modal.Header>
        {popupValues ? (
          <FormattedMessage id='pruduct.groups.edit' defaultMessage='Edit Product Group' />
        ) : (
          <FormattedMessage id='pruduct.groups.add' defaultMessage='Add Product Group' />
        )}
      </Modal.Header>
      <Modal.Content>
        <Form
          enableReinitialize
          initialValues={initialFormValues}
          validationSchema={productGroupsPoprupFormValidation()}
          onReset={closePopup}
          onSubmit={async (values, { setSubmitting }) => {
            const request = {}
            const propsToInclude = ['tags', 'name'] //, 'marketSegments'  commented based on https://pm.artio.net/issues/34033#note-22
            propsToInclude.forEach(prop => (values[prop] ? (request[prop] = values[prop]) : null))

            try {
              if (popupValues) await putProductGroups(rowId, request, selectedTagsOptions)
              //, selectedMarketSegmentsOptions  commented based on https://pm.artio.net/issues/34033#note-22
              else await postProductGroups(request)
            } catch (err) {
              console.error(err)
            } finally {
              setSubmitting(false)
              closePopup()
            }
          }}>
          {(props) => {
            return (
              <>
                <FormGroup data-test='operations_tag_name_inp'>
                  <Input
                    name='name'
                    type='text'
                    label={
                      <>
                        <FormattedMessage id='operations.name' defaultMessage='Name' />
                        <Required />
                      </>
                    }
                    fieldProps={{ width: 8 }}
                  />
                  <FormikDropdown
                    fieldProps={{ width: 8 }}
                    label={
                      <>
                        <FormattedMessage id='product.groups.tags' defaultMessage='Tags' />
                      </>
                    }
                    name='tags'
                    options={allTagsOptions || []}
                    inputProps={{
                      loading: searchedTagsLoading,
                      search: true,
                      icon: 'search',
                      selection: true,
                      multiple: true,
                      noResultsMessage: formatMessage({
                        id: 'global.startTypingToSearch',
                        defaultMessage: 'Start typing to begin search'
                      }),
                      onSearchChange: handleTagsSearchChange,
                      onChange: (_, { value }) => handleTagsChange(value, allTagsOptions)
                    }}
                  />
                  {/*commented based on https://pm.artio.net/issues/34033#note-22*/}
                  {false && (
                    <>
                      <FormikDropdown
                        fieldProps={{ width: 5 }}
                        label={
                          <>
                            <FormattedMessage id='product.groups.marketSegment' defaultMessage='Market Segment' />
                          </>
                        }
                        name='marketSegments'
                        options={[]}
                        inputProps={{
                          loading: searchedMarketSegmentsLoading,
                          search: true,
                          icon: 'search',
                          selection: true,
                          multiple: true,
                          noResultsMessage: formatMessage({
                            id: 'global.startTypingToSearch',
                            defaultMessage: 'Start typing to begin search'
                          }),
                          onSearchChange: () => {},
                          onChange: (_, { value }) => {}
                        }}
                      />
                    </>
                  )}
                </FormGroup>

                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='operations_tag_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                  </Button.Reset>
                  <Button.Submit data-test='operations_tag_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save' />
                  </Button.Submit>
                </div>
                <ErrorFocus />
              </>
            )
          }}
        </Form>
      </Modal.Content>
    </Modal>
  )
}

ProductGroupsPopup.propTypes = {
  closePopup: PropTypes.func,
  popupValues: PropTypes.any,
  rowId: PropTypes.number,
  putProductGroups: PropTypes.func,
  postProductGroups: PropTypes.func,
  datagrid: PropTypes.object,
  searchedTags: PropTypes.array,
  searchedTagsLoading: PropTypes.bool,
  searchedMarketSegmentsLoading: PropTypes.bool,
  intl: PropTypes.object
}

ProductGroupsPopup.defaultProps = {
  closePopup: () => {},
  popupValues: null,
  rowId: null,
  putProductGroups: () => {},
  postProductGroups: () => {},
  datagrid: {},
  searchedTags: [],
  searchedTagsLoading: false,
  searchedMarketSegmentsLoading: false,
  intl: {}
}

export default withDatagrid(
  injectIntl(withToastManager(ProductGroupsPopup))
)
