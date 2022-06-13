import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from "react-router-dom";
import {Paper} from "@material-ui/core";

import MdeEditor from "./../components/registryContent/mdeEditor";

import InputBox from "./../components/inputBox";
import InputButton from "./../components/inputButton";
import {postSnippet} from "./../axios/serverRequests";
import UserContext from "./../context/userContext";


function AddCode() {

    const history = useHistory();
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(!user.loggedIn){
            history.push("/login");
        }
    }, [user]);

    const setDescData = (data) =>{
        setSnipData({...snipData, description: data});
    }
   
    const handleChange = async (event)=>{
        
        if(event.target.name === "title"){
            setSnipData({...snipData, title: event.target.value});
        }

        if(event.target.name === "description"){
            setSnipData({...snipData, description: event.target.value});
        }

        if(event.target.name === "code"){
            setSnipData({...snipData, code: event.target.value});
        }

        if(event.type === "click"){
            postSnippet(snipData);
            history.push("/")
        }
    }

    const[snipData, setSnipData] = useState({title: "", description: "", code: ""});

    return (
        <div>
            <Paper variant="outlined" style={{marginLeft: "30%", marginTop: "30px", padding: "2px", paddingBottom: "5px", width: "40%"}} elevation={2} >
                <InputBox placeholder="Title" name="title" value={snipData.title} onChildChange={handleChange} style={{width: "100%"}}></InputBox>
                <MdeEditor placeholder="Description" name="description" value={snipData.description} parentCallback={setDescData} style={{marginTop: "10px", width: "100%"}}></MdeEditor>
                <InputBox placeholder="Code" name="code" value={snipData.code} onChildChange={handleChange} style={{marginTop: "10px", width: "100%"}} rows={8} rowsMax={8} multiline={true}></InputBox>
                <InputButton onChildClick={handleChange} style={{marginTop: "8px", marginLeft: "86%" , width: "100px"}} label="Post"></InputButton>
            </Paper>
        </div>
    )
}

export default AddCode;
