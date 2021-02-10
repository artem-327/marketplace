import { Grid, GridColumn, Modal, Divider, FormGroup, Segment, Sidebar, Dimmer, Loader, Form } from 'semantic-ui-react'
import { Input, Button, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { bool, func, object } from 'prop-types'
import styled from 'styled-components'

export const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
  ${props =>
  props.placeholder &&
  `
    > .grid > .divider:after {
      height: 100% !important;
    }
  `}
`

export const ColumnSidebar = styled(Grid.Column)`
  padding: 0px !important;
`

export const RowSidebar = styled(Grid.Row)`
  padding: 0px !important;
`

export const RowSidebarAddress = styled(Grid.Row)`
  padding-top: 0px !important;
`