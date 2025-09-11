export default function (err, req, res, next) {
    res.status(404).json({mes: err.message});
}