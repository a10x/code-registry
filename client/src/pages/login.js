import React, {useState, useContext, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import { Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useTheme} from "@material-ui/core";

import InputBox from "./../components/inputBox";
import InputButton from "./../components/inputButton";

import {postLogin} from "../axios/serverRequests";
import UserContext from '../context/userContext';

const useGetStyles = () =>{
    const theme = useTheme();

    return {
        loginBox:{
            background: theme.palette.secondary.light,
            width: "50%",
            minWidth: "400px",
            maxWidth: "500px",
            height: "280px",
            boxShadow: "0 3px 5px 4px rgba(0, 0, 0, 0.3)"
        },

        loginTitle:{
            color: theme.palette.common.white,
            fontSize: 30,
            marginTop: "20px",
            marginLeft: "40%",
            marginBottom: "15px"
        }
    }
}

const getStyles = {
    userInput: {
        marginTop: "10px",
        marginLeft: "28%",
        width: "300px"
    },
    loginButton:{
        marginLeft: "33%",
        marginTop: "20px",
        marginBottom: "40px",
    }
}

const useStyles = makeStyles(useGetStyles);

function Login(props) {
    const classes = useStyles();
    const {user, setUser} = useContext(UserContext);

    useEffect(()=>{
        if(user.loggedIn)props.history.push("/");
    }, [user]);

    const handleChange = (event)=>{
        if(event.target.name === "username"){
            setUserData({username: event.target.value, password: userData.password});
        }
        if(event.target.name === "password"){
            setUserData({username: userData.username, password:event.target.value});
        }

        if(event.type === "click"){
            postLogin(userData).then(e=>{
                setUser({username: e.username, loggedIn: true, exp: e.exp});
                props.history.push("/");
            });
        }
    }

    const [userData, setUserData] = useState({username: "", password: ""});

  return <Box className={classes.loginBox} >
      <Typography className={classes.loginTitle}>Log In</Typography>
      <InputBox style={getStyles.userInput} name="username" value={userData.username} onChildChange={handleChange} label="Username"></InputBox>
      <InputBox style={getStyles.userInput} name="password" value={userData.password} onChildChange={handleChange} label="Password"></InputBox>
      <InputButton style={getStyles.loginButton} name="submit" onChildClick={handleChange} label="Log In"></InputButton>
  </Box>;
}

export default Login;
