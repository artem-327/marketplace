import React from "react"
import { Message } from "semantic-ui-react"
import { connect } from "react-redux"
import { closeToast } from "src/pages/settings/actions"

const Toast = ({ message, wasSuccess, closeToast }) =>
  message ? (
    <Message
      onDismiss={closeToast}
      success={wasSuccess}
      error={!wasSuccess}
      header="Removal request"
      content={message}
    />
  ) : null

const mapDispatchToProps = {
  closeToast
}

const mapStateToProps = ({ settings: { toast } }) => {
  return {
    message: toast.message,
    isSuccess: toast.isSuccess
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast)
