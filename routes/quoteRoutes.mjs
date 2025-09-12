import express from 'express';
import { quotes } from "../data/quotes.mjs"


// creatae express instant and save in router (instead of app)
const router = express();

//Use this to test post new quote
// {
//     "character": "Kagami Hiiragi",
//     "show": "Lucky Star",
//     "quote": "Could you stop skipping the thinking process when you respond?"
// }

router
    .route('/')
    // Create 
    // @route: POST /quotes
    // @desc: create NEW quote
    // @access: Public
    .post((req, res) => {
        let { character, show, quote } = req.body;

        let newDBEntry = {
            id: quotes.length,
            character,
            show,
            quote
        }

        quotes.push(newDBEntry)
        res.status(201).json({ msg: "New Entry Created!" });
    })
    // READ 
    // @route: GET /quotes
    // @desc: Get ALL quotes 
    // @access: Public
    .get((req, res) => {
        res.json(quotes);
    })


router.route('/:id')
    // READ by ID
    // @route: GET /quotes/:id
    // @desc: Get quotes by id
    // @access: Public
    .get((req, res) => {
        const quote = quotes.find( (quote) => quote.id == req.params.id);

        if (quote) res.json(quote)
            else throw new Error(`❌📄 - Quote not found!`);
    })

    // UPDATE 
    // @route: PUT /quotes/:id
    // @desc: Update quote by id
    // @access: Public
    .put((req, res) => {
        let id = Number(req.params.id);
        console.log(id);

        quotes.splice(id, 1, {
            id,
            character: req.body.character,
            show: req.body.show,
            quote: req.body.quote
        })

        res.json({ msg: "Quote Updated", quote: req.body })
    })
    // DELETE 
    // @route: DELETE /quotes/:id
    // @desc: Delete a quote by id
    // @access: Public
    .delete((req, res, next) => {
        try {
            let id = Number(req.params.id);
            let deleted = quotes[id];

            if (!deleted) {
                res.status(404).json({ msg: "Quote not found" });
            }

            quotes.splice(id, 1)

            res.json({
                msg: "Quote Deleted",
                deletedQuote: deleted
            })

        } catch (err) {
            console.log("Delete Error: ", err);
            res.status(500).json({ msg: "Server Error:", error: err })
        }


    });

export default router;