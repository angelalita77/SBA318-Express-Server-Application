// formQuoteRoutes you can do the following methods:
// GET, GET by ID, POST, PUT by ID, and DELETE by ID
import express from 'express';

// Import data colletion
import formQuotes from '../data/formQuotes.mjs';

// creatae express instant and save in router (instead of app)
const router = express();


// ------------ Sample Request JSON to test POST
// Uncomment, copy paste the json below, then comment back again
// {
// "title": "Yu Hakusho",
// "name": "Hiei",
// "quote": "There is no man who does not carry scars upon his heart. If there were such a man, he would have a shallow soul.",
// "img": "https://www.giantbomb.com/a/uploads/scale_small/1/12227/444836-hiei_a.jpg"
// }
// ------------ Sample Request JSON to test PUT
// Uncomment, copy paste the json below, then comment back again
// {
// "title": "Yuyu Hakusho",
// "name": Hiei
// "quote": “There is no man who does not carry scars upon his heart. If there were such a man, he would have a shallow soul.”
// "img": "https://www.giantbomb.com/a/uploads/scale_small/1/12227/444836-hiei_a.jpg"
// }


router
    .route('/')
    // // Create 
    // // @route: POST /form-quotes
    // // @desc: create NEW quote
    // // @access: Public
    .post((req, res) => {
        let { title, name, quote, img } = req.body;

        if (title && name && quote && img) {
            let newDBEntry = {
                id: formQuotes.length,
                title,
                name,
                quote,
                img
            }
            formQuotes.push(newDBEntry);
            res.status(201).json({ msg: "New Entry Created!" });

        } else {
            throw new Error(`❌📄 - Insufficient data!`);
            next();
        }   
    })
    // READ 
    // @route: GET /form-quotes
    // @desc: Get ALL shows
    // @access: Public
    .get((req, res) => {
        res.json(formQuotes);
    })
    .put((req, res) => {
        res.json({msg: "Forgot id"})
    })

router
    .route('/:id')
    // READ by ID
    // @route: GET /form-quotes/:id
    // @desc: Get form-quotes by id
    // @access: Public
    .get((req, res, next) => {
        const quote = formQuotes.find((quote) => quote.id == req.params.id);

        // If there is no show listed under that id, throw an error
        if (!quote) {
            throw new Error(`❌📄 - Show not found!`);
            next();
        }
        res.json(quote);
    })
    // UPDATE 
    // @route: PUT /show/:id
    // @desc: Update show by id
    // @access: Public
    .put((req, res, next) => {
        let id = Number(req.params.id);

        let { title, name, quote, img } = req.body;

        // Update only if title and year is included in body
        if (title && name && quote && img) {
            formQuotes.splice(id, 1, {
                id,
                title: req.body.title,
                name: req.body.name,
                quote: req.body.quote,
                img: req.body.image
            })
        } else {
            throw new Error(`❌📄 - Insufficient data!`);
            next();
        }

        res.json({ msg: "Show Updated", quote: req.body })
    })
    // DELETE 
    // @route: DELETE /quotes/:id
    // @desc: Delete a quote by id
    // @access: Public
    .delete((req, res, next) => {
        try {
            let id = Number(req.params.id);
            let deleted = formQuotes[id];

            if (!deleted) {
                res.status(404).json({ msg: "Quote not found" });
            }

            formQuotes.splice(id, 1)

            res.json({
                msg: "Show Deleted",
                deletedShow: deleted
            })

        } catch (err) {
            console.log("Delete Error: ", err);
            res.status(500).json({ msg: "Server Error:", error: err })
        }
    });

export default router;