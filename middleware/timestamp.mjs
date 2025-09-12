export default ( (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(timestamp);
    next();
})