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



// Env Setups
const app = express();
const PORT = 3000;




//Build my View Engine with .quo as the extension
app.engine("quo", (filePath, options, callback) => {
   fs.readFile(filePath, (err, content) => {
    if(err) return callback(err);

    const rendered = content
    .toString()
    .replaceAll("#webTitle#", options.webTitle)
    .replace("#content#", options.content)
    .replace("#formImage#", options.formImage)
    .replaceAll("#title#", options.title)
    .replace("#name#", options.name)
    .replace("#quote#", options.quote)
    .replace("#img#", options.image)


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
//app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static("./styles"))

//Routes
app.use('/', baseRoutes);
app.use('/quotes', quotes);
app.use('/shows', shows); 
app.use('/characters', characters);
app.use('/form-quotes', formQuotes);

// View Template
app.get('/form', (req, res) => {

    let option = {
        webTitle: "Anime Quotes",
        content: "Enter new quotes here.",
        formImage: "https://img.fruugo.com/product/3/04/1598105043_max.jpg"
    }
    res.render('quoteForm', option)
})
app.post('/test', (req, res) => {
    const {title, name, quote, image} = req.body;
    console.log(req.body.image);

    let option = {title, name, quote, image }
    console.log
    res.render("animequote", option)
})

//Form Entry Used for Test
//DBZ
//Goku
//"FREEEZA!"
//https://i.pinimg.com/736x/40/b8/b2/40b8b2320bf90b03fa02c33da39bb6e5.jpg


//Global Error Handling
app.use(globalErr);


//Server Listener
app.listen(3000, (req, res) => {
    console.log(`Server is running at port ${PORT}`);
})
