import React from 'react';
import { Navigate } from 'react-router-dom';

const Profile = ({ userLoggedIn }) => {
   
    console.log("profile ////",userLoggedIn);
    
    return (userLoggedIn?
        <div>
            <h2>Profile</h2>
            {/* Add profile details here */}
        </div>:<Navigate to="/" replace />
    );
};

export default Profile;

