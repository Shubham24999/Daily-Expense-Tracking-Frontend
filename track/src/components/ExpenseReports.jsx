import React from 'react'
import { Navigate } from 'react-router-dom';

const ExpenseReports = ({ userLoggedIn }) => {


    return (userLoggedIn ?
        <div>
            ExpenseReports
        </div> : <Navigate to="/" replace />
    )
}

export default ExpenseReports
