import { Typography } from '@material-ui/core'
import React from 'react'
import AccountLogo from '../accountLogo'

import "./snipDisplay.css"

function SnipDisplay(props) {
    const username = props.credit === undefined ? "username" : props.credit;
    const title = props.title === undefined ? "Title": props.title;
    const desc = props.description === undefined ? "This is a description" : props.description;
    const votes = props.votes === undefined ? 0 : props.votes;
    const views = props.views === undefined ? 0 : props.views;

    return (
        <>
            <div className="container">
                <div className="left">
                    <div className="voteContainer">
                        <Typography>{votes}</Typography>
                        <Typography>Votes</Typography>
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
                        <Typography className="description">{desc}</Typography>
                    </section>
                </div>
            </div>
        </>
    )
}

export default SnipDisplay
