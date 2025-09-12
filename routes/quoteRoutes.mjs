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
    // @desc: create character route
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
        res.status(201).res.json({ msg: "New Entry Created!"});
    })
    .get((req, res) => {
        res.json(quotes);
    })

router.route('/:id')
    .put((req, res) => {
        res.send(`Test Put character routes: Param ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Test Delete character routes: Param ${req.params.id}`)
    });

export default router;