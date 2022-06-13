import React from 'react'

import accountLogo from "./../images/account.jpg"

function AccountLogo(props) {
    let imageWidth = props.width;
    let imageHeight = props.height;
    if(!props.width){
        imageWidth = 45;
        imageHeight = 45;
    }
    return <img {...props} src={accountLogo} width={imageWidth} height={imageHeight}></img>
}

export default AccountLogo;
