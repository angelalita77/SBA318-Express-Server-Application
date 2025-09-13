import express from 'express';

// Import data colletion
import { quotes } from "../data/quotes.mjs"
import { characters } from "../data/characters.mjs"
import { shows } from "../data/shows.mjs"


// creatae express instant and save in router (instead of app)
const router = express();


router
    .route('/')
    // Create 
    // @route: POST /quotes
    // @desc: create NEW quote
    // @access: Public
    .post((req, res) => {
        let { character, quote  } = req.body;


        let newDBEntryQuotes = {
            id: quotes.length,
            character,
            quote,
        }

        quotes.push(newDBEntry)
        res.status(201).json({ msg: "New Entry Created!" });
    })
    // READ 
    // @route: GET /quotes
    // @desc: Get ALL quotes and character
    // @access: Public
    .get((req, res) => {
        // will look at each object withn the quotes array
        // each quote quoteobject is passed through "quoteObj" parameter
        const quote = quotes.map(quoteObj => {
            // find if the character's ID in characters.mjs array = charID in quotes array, if so save to "character"
            const character = characters.find(c => c.id === quoteObj.characterId);
            // find if the show's ID in show.mjs = showID in character.mjs array, then save to "show"
            const show = shows.find(s => s.id === character.showId);

            //construct object to return with GET method
            //should have all the information of the quote, character, show, and image
            return {
                id: quoteObj.id,
                quote: quoteObj.quote,
                character: {
                    id: character.id,
                    name: character.name,
                    img: character.img
                },
                show: {
                    id: show.id,
                    title: show.title,
                    year: show.year
                }
            };
        })
        res.json(quote);
    });


router
    .route('/:id')
    // READ by ID
    // @route: GET /quotes/:id
    // @desc: Get quotes by id
    // @access: Public
    .get((req, res, next) => {
        const quote = quotes.find((quote) => quote.id == req.params.id);
       
        
        if (!quote){
         throw new Error(`❌📄 - Quote not found!`);
         next();
        }

        // find if the character's ID in characters.mjs array = charID in quotes array, if so save to "character"
        const character = characters.find(c => c.id === quote.characterId);
        // find if the show's ID in show.mjs = showID in character.mjs array, then save to "show"
        const show = shows.find(s => s.id === character.showId);

        const selectedQuote = {
                id: quote.id,
                quote: quote.quote,
                character: {
                    id: character.id,
                    name: character.name,
                    img: character.img
                },
                show: {
                    id: show.id,
                    title: show.title,
                    year: show.year
                }
            }
        
        res.json(selectedQuote);
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