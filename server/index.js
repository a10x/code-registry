//external imports
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");

//internal imports
const mongoDB = require("./database/mongoDB");

const app = express();
const PORT = process.env.PORT || 5000;
const listEndpoints = require('express-list-endpoints')

//routes
const registerRoute = require("./routes/auth/register");
const loginRoute = require("./routes/auth/login");
const logoutRoute = require("./routes/auth/logout");
const authToken = require("./routes/auth/authToken");

const addSnippetRoute = require("./routes/processSnippet");
const getSnippetRoute = require("./routes/reqSnippet");
const updateSnippetRoute = require("./routes/updateSnippet");

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    key: "ut",
    secret: "sdfsjdlfjsdjkfsjdkjfksdkjfksj",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000*24
    }
}));

mongoDB.connectToDatabase();

app.use("/api/user", registerRoute);
app.use("/api/user", loginRoute);
app.use("/api/user", logoutRoute);
app.use("/api/snippet/update", updateSnippetRoute);
app.use("/api/snippet", addSnippetRoute);
app.use("/api/snippet", getSnippetRoute);
app.use("/api/user", authToken);

app.get("/", (req, res)=>{
    res.send("Hello World");
});

app.listen(PORT, ()=>{
    console.log("Server Started");
});