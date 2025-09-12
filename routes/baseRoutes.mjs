import express from 'express';

// creatae express instant and save in router (instead of app)
const router = express();



router.route('/')
    .get((req, res) => {
        res.json({msg:"Test GET"})
    })
    .post((req, res) => {
        res.send(`Test Post`)
    });
router.route('/:id')
    .put((req, res) => {
        res.send(`Test Put Route: Param ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Test Delete Route: Param ${req.params.id}`)
    });

export default router;
