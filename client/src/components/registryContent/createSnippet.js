import React from 'react'

import "./createSnippet.css"

import {useHistory} from "react-router-dom";


function CreateSnippet() {
    const history = useHistory();
    return (
        <div className="createContainer">
            <input onClick={(e)=>{history.push("/postSnip")}} readOnly value="" placeholder="Create Snippet" className="createButton"></input>
        </div>
    )
}

export default CreateSnippet
