import React, {useEffect} from 'react'
import {useContext} from "react";
import {useHistory} from "react-router-dom";

import UserContext from '../context/userContext';

import {logout} from "./../axios/serverRequests";

function Logout() {

    const history = useHistory();

    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        async function logoutUser(){
            if(user.loggedIn){
                const log = await logout();
                if(log === true){
                    setUser({username: "guest", loggedIn: false, exp: null});
                }
            }
            history.push("/");
        }
        logoutUser();
    }, [user])
    

    return (
        <div>
            Logging Out...
        </div>
    )
}

export default Logout;
