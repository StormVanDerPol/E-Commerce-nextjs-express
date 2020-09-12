module.exports = function (error, res) {
    console.log({ error });
    res.status(500).send({ success: false, message: 'UNHANDLED ERROR' });
}