import React from 'react'

import registryLogo from "./../images/betterlogo.png"

function RegistryLogo(props) {
    let imageWidth = props.width;
    let imageHeight = props.height;
    if(!props.width){
        imageWidth = 180;
        imageHeight = 50;
    }
    return <a href="http://localhost:3000/"><img {...props} src={registryLogo} width={imageWidth} height={imageHeight}></img></a>
}

export default RegistryLogo;
