//Imports
import express from "express";
import globalErr from "./middleware/globalErr.mjs";
import log from "./middleware/logging.mjs";
import timestamp from "./middleware/timestamp.mjs";
//Import routes
import baseRoutes from "./routes/baseRoutes.mjs"
import quotes from "./routes/quoteRoutes.mjs"
import shows from "./routes/showRoutes.mjs"
import characters from "./routes/characterRoutes.mjs"
import formQuotes from "./routes/formQuoteRoutes.mjs";
// Import FS
import fs from 'fs';
import path from "path";



// Env Setups
const app = express();
const PORT = 3000;




//Build my View Engine with .quo as the extension
app.engine("quo", (filePath, options, callback) => {
   fs.readFile(filePath, (err, content) => {
    if(err) return callback(err);

    const rendered = content
    .toString()
    .replaceAll("#title#", options.title)
    .replace("#content#", options.content)
    .replace("#img#", options.img)

    return callback(null, rendered);
});
});

// Setup views directory and register templte engine
app.set('views', './views');
app.set("view engine", "quo");



// Middleware
// custom log to return method, request URL and status code
app.use(log);
app.use(timestamp);
app.use(express.json()); // for parsing JSON data
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(process.cwd(), "public")));

//Routes
app.use('/', baseRoutes);
app.use('/quotes', quotes);
app.use('/shows', shows); 
app.use('/characters', characters);
app.use('/form-quotes', formQuotes);
app.get('/home', (req, res) => {

    let option = {
        title: "Anime Quotes",
        content: "This website will show a few quotes from anime that are deep and sometimes funny.",
        img: "https://img.fruugo.com/product/3/04/1598105043_max.jpg"
    }
    res.render('quoteForm', option)
})



//Global Error Handling
app.use(globalErr);


//Server Listener
app.listen(3000, (req, res) => {
    console.log(`Server is running at port ${PORT}`);
})
