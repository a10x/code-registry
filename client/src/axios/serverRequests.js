const axios = require("axios");

axios.defaults.withCredentials = true;

const getFullRoute = (route)=>{
    return "http://localhost:5000/api/" + route;
}

export const postLogin = async (userData)=>{
    return await axios.post(getFullRoute("user/login"), {
        username: userData.username,
        password: userData.password
    })
    .then(response => {
        return {success: true,  exp: response.data.exp, username: response.data.user}
    })
    .catch(()=>{return {succes: false}});
}

export const postRegister = async (userData)=>{
    axios.post(getFullRoute("user/register"), {
        username: userData.username,
        email: userData.email,
        password: userData.password
    })
    .then(response => {
        return {success: true,  exp: response.data.exp, username: response.data.user}
    })
    .catch(()=>{return {succes: false}});
}

export const logout = async () => {
    return await axios.post(getFullRoute("user/logout"))
    .then(() => {return true;})
    .catch(()=>{return false;})
}

export const requestUsername = async (userID)=>{
    axios.post(getFullRoute("user/request"), {
        username: userID
    })
    .then(response => {
        return response.data.username
    })
    .catch();
}


const axiosConfig = {
    headers: {
        'authorisation': localStorage.getItem("authorisation")
    }
}

export const postSnippet = async (snipData)=>{
    return await axios.post(getFullRoute("snippet/add"), {
        title: snipData.title,
        description: snipData.description,
        snippet: snipData.code
    })
    .then(res=>{return res;})
    .catch();
}

export const getSnippets = async ()=>{
    let snippets = [];
    await axios.get(getFullRoute("snippet/get"))
    .then(response => {snippets = response.data;})
    .catch();
    return snippets;
}

export const authUser = async function(token){
    return await axios.post(getFullRoute("user/authUser"))
    .then((r)=>{return r.data})
    .catch(()=>{return {valid: false}});
}

export const getSnippet = async function(id){
    let snippet;
    await axios.get(getFullRoute("snippet/get/"+id))
    .then(res=>{snippet=res.data})
    .catch();
    return snippet;
}

export const updateSnippetVote = async function(snip, vote){
    let success = false;
    await axios.post(getFullRoute("snippet/update/votes"), {
        snipId: snip,
        vote: vote
    })
    .then(()=>{success = true;})
    .catch(()=>{success = false;});
    return success;
}


export const updateSnippetViews = async function(snip){
    return await axios.post(getFullRoute("snippet/update/views"),{
        snipId: snip
    })
    .then()
    .catch();
}