// quoteRoute you can do the following methods:
// POST, GET, GET by ID, PUT by ID, DELETE by ID, QUERY (title or year)

import express from 'express';

// Import data colletion
import { shows } from "../data/shows.mjs"

// creatae express instant and save in router (instead of app)
const router = express();

// ------------ Sample Request JSON to test POST
// Uncomment, copy paste the json below, then comment back again
// {
// "title": "Death Noote",
// "year": 2006
// }
// ------------ Sample Request JSON to test PUT
// Uncomment, copy paste the json below, then comment back again
// {
// "title": "Death Note",
// "year": 2006
// }

router
    .route('/')
    // // Create 
    // // @route: POST /shows
    // // @desc: create NEW quote
    // // @access: Public
    .post((req, res) => {
        let { title, year } = req.body;

        if (title && year) {
            let newDBEntry = {
                id: shows.length,
                title,
                year,
            }
            shows.push(newDBEntry);
            res.status(201).json({ msg: "New Entry Created!" });

        } else {
            throw new Error(`❌📄 - Insufficient data!`);
            next();
        }
    })
    // READ 
    // @route: GET /shows
    // @desc: Get ALL shows
    // @access: Public
    .get((req, res) => {
        res.json(shows);
    });

    // READ (QUERY)
    // @route: GET /shows/search?
    // @desc: Query through shows for only "title" OR "year" (Not both)
    // @access: Public
router
    .route('/search')
    .get((req, res, next) => {
        console.log(req.query.title);
        console.log(req.query.year);
        
        // Title QUERY
        // if title is queried only
        if (req.query.title) {
            // Get value of title in string
            const titleFilter = req.query.title;
            // filter through obj array and return only
            // show objects that match the title.
            const filteredShow = shows.filter(show =>
                show.title === titleFilter)
                // return objects with that title
                res.json(filteredShow);  
        }

        // YEAR QUERY
        // if year is queried only
        if (req.query.year) {
            const yearFilter = Number(req.query.year);
            console.log(yearFilter);
             // filter through obj array and return only
            // show objects that match the year.
            const filteredShow = shows.filter(show =>
                show.year === yearFilter);
            // return the ojects with that year
            res.json(filteredShow);
            }


    });


router
    .route('/:id')
    // READ by ID
    // @route: GET /quotes/:id
    // @desc: Get quotes by id
    // @access: Public
    .get((req, res, next) => {
        const show = shows.find((show) => show.id == req.params.id);

        // If there is no show listed under that id, throw an error
        if (!show) {
            throw new Error(`❌📄 - Show not found!`);
            next();
        }
        res.json(show);
    })
    // UPDATE 
    // @route: PUT /show/:id
    // @desc: Update show by id
    // @access: Public
    .put((req, res, next) => {
        let id = Number(req.params.id);
        const { title, year } = req.body;

        // Update only if title and year is included in body
        if (title && year) {
            shows.splice(id, 1, {
                id,
                title: req.body.title,
                year: req.body.year
            })
        } else {
            throw new Error(`❌📄 - Insufficient data!`);
            next();
        }

        res.json({ msg: "Show Updated", show: req.body })
    })
    // DELETE 
    // @route: DELETE /quotes/:id
    // @desc: Delete a quote by id
    // @access: Public
    .delete((req, res, next) => {
        try {
            let id = Number(req.params.id);
            let deleted = shows[id];

            if (!deleted) {
                res.status(404).json({ msg: "Quote not found" });
            }

            shows.splice(id, 1)

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