import React from 'react'

import RegistryContent from "./../components/registryContent/registryContent"
import CreateSnippet from "./../components/registryContent/createSnippet"

import "./home.css"

function Home() {
    
    return (
        <div>
           {/* <RegistryContent style={{marginLeft:"40%", marginTop: "10px", width:"400px"}}></RegistryContent>*/}
           <CreateSnippet></CreateSnippet>
           <RegistryContent></RegistryContent>
            
        </div>
    )
}

export default Home;
