import express from 'express';

// creatae express instant and save in router (instead of app)
const router = express();



router.route('/')
    .get((req, res) => {
        res.json({msg:"Hello There"})
    })

export default router;
