import React, {useState, useEffect} from 'react'
import SnipDisplay from "./../snipDisplay/snipDisplay";
import {getSnippets} from "./../../axios/serverRequests";

import {useHistory} from "react-router-dom";

import "./registryContent.css";

function RegistryContent(props) {
    const history = useHistory();
    const [snippets, setSnippets] = useState([]);
    

    useEffect(()=>{
        getSnippets()
        .then(res => {setSnippets(res.data);})
        .catch();
    }, []);

    snippets.sort((a, b)=>{
        return b.votes - a.votes;
    });
    
    return (
        <div className="snipsContainer">
            {
                snippets.map(item =>
                    <div key={item._id} onClick={e=>{history.push("/show?id=" + item._id)}}className="snipItem">
                        <SnipDisplay credit={item.user[0].username} votes={item.votes} views={item.views} title={item.title} description={item.description}>
                        </SnipDisplay>
                    </div>)
            }
        </div>
    )
}

export default RegistryContent;
