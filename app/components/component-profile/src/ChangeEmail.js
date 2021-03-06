import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@pubsweet/ui'
import { th } from '@pubsweet/ui-toolkit'
import styled from 'styled-components'

const InlineTextField = styled(TextField)`
  border-color: ${props => (props.error ? '#ff2d1a' : '#AAA')};
  display: inline;
  width: calc(${th('gridUnit')} * 24);
`

const UpdateEmailError = styled.p`
  color: #ff2d1a;
  font-size: 14px;
`

const ChangeEmail = ({ user, updateUserEmail }) => {
  const [email, setEmail] = useState(user.email)

  const [updateEmailError, setUpdateEmailError] = useState(
    user.email ? '' : 'Required',
  )

  React.useEffect(() => {
    setEmail(user.email)
  }, [user.email])

  // eslint-disable-next-line no-shadow
  const updateEmail = async email => {
    await updateUserEmail({ variables: { email } }).then(response => {
      if (!response.data.updateCurrentEmail.success) {
        setUpdateEmailError(response.data.updateCurrentEmail.error)
      } else {
        setUpdateEmailError('')
      }
    })
  }

  return (
    <>
      <InlineTextField
        error={updateEmailError}
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <Button onClick={() => updateEmail(email)}>Change</Button>
      {updateEmailError && (
        <UpdateEmailError>{updateEmailError}</UpdateEmailError>
      )}
    </>
  )
}

ChangeEmail.propTypes = {
  user: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
}
export default ChangeEmail
