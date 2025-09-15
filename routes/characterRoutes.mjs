// characterRoutes you can do the following methods:
// GET, GET by ID,

import express from  'express';
// Import data colletion
//import { quotes } from "../data/quotes.mjs"
import { characters } from "../data/characters.mjs"
//import { shows } from "../data/shows.mjs"

// creatae express instant and save in router (instead of app)
const router = express();

router
    .route('/')
    // READ 
    // @route: GET /characters
    // @desc: Get ALL characters
    // @access: Public
    .get((req, res) => {
        res.json(characters);
    });

router
    .route('/:id')
    // READ by ID
    // @route: GET /characters/:id
    // @desc: Get character by id
    // @access: Public
    .get((req, res, next) => {
        const character = characters.find((character) => character.id == req.params.id);

        // If there is no show listed under that id, throw an error
        if (!character) {
            throw new Error(`❌📄 - Show not found!`);
            next();
        }
        res.json(character);
    });
   

export default router;