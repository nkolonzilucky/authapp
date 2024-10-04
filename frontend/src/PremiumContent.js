import React from "react";
import { getUser, resetUserSession } from './services/authServices';

function PremiumContent(props) {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name: '';
    const logoutHandler = () => {
        resetUserSession();
        props.history.push('/login');
    }
    return (
        <div>
            Hello {name}! You have been logged in!!! Welcome to the premium content.
            <input type="button" value="Logout" onClick={logoutHandler} />
        </div>
    )
};

export default PremiumContent;