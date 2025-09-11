export default (req, res, next) => {
    console.log(`${req.method} ${req.url} - Finished with status ${res.statusCode} `)
    next();
};

