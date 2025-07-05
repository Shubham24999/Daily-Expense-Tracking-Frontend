import React from 'react'
import { Navigate } from 'react-router-dom';

const Settings = ({userLoggedIn}) => {


  return (userLoggedIn?
    <div>
      Settings
    </div>: <Navigate to="/" replace />
  )
}

export default Settings
