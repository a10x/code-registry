import React, {useState, useEffect, useContext} from 'react'
import {useTheme} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';

import RegistryLogo from "../logo";
import SearchBox from "../searchBox";
import InputButton from "../inputButton";

import "./navBar.css";
import {useHistory} from "react-router-dom";
import {authUser} from "../../axios/serverRequests";

import UserContext from '../../context/userContext';

const useGetStyles = () => {
    const theme = useTheme();

    return {
        welcomeText:{
            color: theme.palette.common.white,
            fontSize: 20,
            marginLeft: "10%",
            marginTop: "10px",
            gridColumnStart: 3,
            gridColumnEnd: 5,
            marginRight: -10,
        },

        loggedIn: {
            gridColumnStart: 5,
        }
    }
}

const useStyles = makeStyles(useGetStyles);

function LoggedOutButtons(props){
    const history = useHistory();
    return(
        <>
            <InputButton name="login" onclick={(e)=>{history.push("/login");}} label="Login"></InputButton>
            <InputButton name="register" onclick={(e)=>{history.push("/register");}} label="Sign Up"></InputButton>
        </>
    );
}

function LoggedInButtons(props){
    const classes = useStyles();
    const history = useHistory();
    return(
        <>
            <Typography className={classes.welcomeText}>{"Welcome, " + props.username}</Typography>
            <InputButton className={classes.loggedIn} name="logout" onclick={(e)=>{history.push("/logout");}} label="Log Out"></InputButton>
        </>
    );
}

//const useStyles = makeStyles(useGetStyles);

function NavBar(props) {

    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        async function checkAuth(){
            const auth = await authUser();

            if(auth.valid === false && user.loggedIn){
                setUser({username: "guest", loggedIn: false, exp: null});
            }else if(auth.valid && user.loggedIn === false){
                setUser({username: auth.username, loggedIn: true, exp: null});
            }
        }
        checkAuth();
       
    }, [user]);

    return (
        <div className="registryNav">
            <RegistryLogo className="registryLogo"></RegistryLogo>
            <SearchBox className="searchBox"></SearchBox>
            {user.loggedIn && <LoggedInButtons username={user.username}/>}
            {!user.loggedIn && <LoggedOutButtons/>}
        </div>
    )
}

export default NavBar;
