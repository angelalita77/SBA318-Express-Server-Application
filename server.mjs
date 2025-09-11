//Imports
import express from "express";
import globalErr from "./middleware/globalErr.mjs";
import log from "./middleware/logging.mjs";


// Setups
const app = express();
const PORT = 3000;


// Middleware
// custom log to return method, request URL and status code
app.use(log);

//Routes
app.get('/', (req, res) => {
    res.send('Testing');
});



//Global Error Handling
app.use(globalErr);

//Server Listener
app.listen(3000, (req, res) => {
    console.log(`Server is running at port ${PORT}`);
})
