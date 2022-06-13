import React, {useState, useEffect, useContext} from 'react';
import Box from '@material-ui/core/Box';
import { Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useTheme} from "@material-ui/core";

import InputBox from "./../components/inputBox";
import InputButton from "./../components/inputButton";
import {postRegister} from "./../axios/serverRequests";
import UserContext from '../context/userContext';

const useGetStyles = () =>{
	const theme = useTheme();

	return {
		loginBox:{
			background: theme.palette.secondary.light,
			width: "50%",
			minWidth: "400px",
			maxWidth: "500px",
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

function Register(props) {
	const classes = useStyles();

	const {user} = useContext(UserContext);

	useEffect(()=>{
        if(user.loggedIn)props.history.push("/");
    }, [user]);

	const handleChange = (event)=>{
		if(event.target.name === "username")
			setUserData({...userData, username: event.target.value});

		if(event.target.name === "password")
			setUserData({...userData, password: event.target.value});

		if(event.target.name === "email")
			setUserData({...userData, email: event.target.value});

		if(event.target.name === "confirmPassword")
			setUserData({...userData, confirmPassword: event.target.value});

		if(event.type === "click"){

			if(!userData.username || !userData.password || !userData.confirmPassword || !userData.email)return;

			if(userData.password !== userData.confirmPassword)return;

			postRegister(userData);
		}
	}	

	const [userData, setUserData] = useState({username: "", email: "", password: "", confirmPassword: ""});

	return <Box className={classes.loginBox} >
		<Typography className={classes.loginTitle}>Sign Up</Typography>
		<InputBox style={getStyles.userInput} name="username" value={userData.username} onChildChange={handleChange} label="Username"></InputBox>
		<InputBox style={getStyles.userInput} name="email" value={userData.email} onChildChange={handleChange} label="Email"></InputBox>
		<InputBox style={getStyles.userInput} name="password" value={userData.password} onChildChange={handleChange} label="Password"></InputBox>
		<InputBox style={getStyles.userInput} name="confirmPassword" value={userData.confirmPassword} onChildChange={handleChange} label="Confirm Password"></InputBox>
		<InputButton style={getStyles.loginButton} name="submit" onChildClick={handleChange} label="Sign Up"></InputButton>
	</Box>;
}

export default Register;
