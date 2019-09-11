import React from 'react'
import {Link} from 'react-router-dom'


import * as ROUTES from '../../constants/routes'
function SignUpLink() {
  return (
   <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Signup</Link> </p>
  )
}

export default SignUpLink
