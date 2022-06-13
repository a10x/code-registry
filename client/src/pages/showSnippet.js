import React, { useState, useEffect, useContext} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Snackbar, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ReactMarkdown from "react-markdown";

import AccountLogo from "../components/accountLogo";
import { getSnippet, updateSnippetViews, updateSnippetVote} from "./../axios/serverRequests";
import UserContext from "../context/userContext";

import "./showSnippet.css";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ShowSnippet(props) {

    const {user, setUser} = useContext(UserContext);

    const [open, setOpen] = useState(false);

    const [vote, setVote] = useState(props.votes === undefined ? 0 : props.votes);
    const [title, setTitle] = useState("Title");
    const [desc, setDesc] = useState("Description");
    const [snip, setSnip] = useState("Snippet");
    const [views, setViews] = useState(0);
    const [username, setUsername] = useState("username");

    const urlParams = new URLSearchParams(window.location.search);
    const snipId = urlParams.get("id");

    useEffect(() => {
        updateSnippetViews(snipId).then();
        getSnippet(snipId).then(res => {
            const data = res.snippet;
            setViews(data.views);
            setTitle(data.title);
            setDesc(data.description);
            setSnip(data.snippet);
            setVote(data.votes);
            setUsername(res.username);
        });

    }, [snipId]);

    const handleClick = () => {
        setOpen(true);
    }

    const handleVote = (event) => {
        const target = event.target;
            
        if(user.loggedIn){
            if (target.getAttribute("name") === "up") {
                setVote(vote+1)
                updateSnippetVote(snipId, 1);
            }
    
            if (target.getAttribute("name") === "down") {
                setVote(vote-1)
                updateSnippetVote(snipId, -1);
            }
        }
    }

    const handleSnipCopy = (event) => {
        navigator.clipboard.writeText(snip).then(() => {
            handleClick();
        });
    }

    const handleClose = (event, reason) => {
        setOpen(false);
    }

    return (
        <div>
            <div className="fullSnippetContainer">
                <div className="left">
                    <div className="voteContainer">
                        <Typography name="up" className="voteArrow" onClick={handleVote}>&#9650;</Typography>
                        <Typography>{vote}</Typography>
                        <Typography name="down" className="voteArrow" onClick={handleVote}>&#9660;</Typography>
                    </div>

                    <div className="viewContainer">
                        <Typography>{views}</Typography>
                        <Typography>Views</Typography>
                    </div>
                </div>
                <div className="right">
                    <section className="credit">
                        <div className="imageContainer"><AccountLogo width={30} height={30}></AccountLogo></div>
                        <Typography className="username">Posted By {username}</Typography>
                    </section>
                    <section className="content">
                        <Typography className="title">{title}</Typography>
                        <Typography className="description">
                            <div><ReactMarkdown source={desc} /></div>
                        </Typography>
                    </section>
                </div>
            </div>
            <section className="secSnip" onClick={handleSnipCopy}>
                <SyntaxHighlighter style={{ borderRadius: "4px" }} language="java" style={docco}>
                    {snip}
                </SyntaxHighlighter>
            </section>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Snippet copied!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ShowSnippet;