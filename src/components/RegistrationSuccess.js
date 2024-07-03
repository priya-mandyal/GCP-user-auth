import React from 'react';

const RegistrationSuccess = ({ username }) => {
    return (
        <div>
            <p>Hello {username} !!</p>
            <p>You have been registered successfully!</p>
            <p>Click <a href="/login">here</a> to login.</p>
        </div>
    );
};

export default RegistrationSuccess;
