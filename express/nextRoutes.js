const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    const { nextApp } = req;
    return nextApp.render(req, res, '/', req.query);
});

router.get('/login', (req, res) => {
    const { nextApp } = req;
    return nextApp.render(req, res, '/login', req.query);
});

router.get('/signup', (req, res) => {
    const { nextApp } = req;
    return nextApp.render(req, res, '/signup', req.query);
});

router.get('/products', (req, res) => {
    const { nextApp } = req;
    return nextApp.render(req, res, '/products', req.query);
});

router.get('/admin/main', (req, res) => {
    const { nextApp } = req;
    return nextApp.render(req, res, '/admin/main', req.query);
});

// router.get('/forbidden', (req, res) => {
//     const { nextApp } = req;
//     return nextApp.render(req, res, '/procuts', req.query);
// });


router.get('*', (req, res, next) => {
    const { nextHandler } = req;
    return nextHandler(req, res)
})


module.exports = router; 
