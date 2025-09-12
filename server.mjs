//Imports
import express from "express";
import globalErr from "./middleware/globalErr.mjs";
import log from "./middleware/logging.mjs";
import baseRoutes from "./routes/baseRoutes.mjs"
import timestamp from "./middleware/timestamp.mjs";



// Setups
const app = express();
const PORT = 3000;



// Middleware
// custom log to return method, request URL and status code
app.use(log);
app.use(timestamp);

//Routes
app.use('/', baseRoutes);





//Global Error Handling
app.use(globalErr);


//Server Listener
app.listen(3000, (req, res) => {
    console.log(`Server is running at port ${PORT}`);
})
