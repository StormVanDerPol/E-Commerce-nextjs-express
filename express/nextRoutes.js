const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src *;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"
    );
    next();
});

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

router.get('/forbidden', (req, res) => {
    const { nextApp } = req;
    return nextApp.render(req, res, '/forbidden', req.query);
});


router.get('*', (req, res, next) => {
    const { nextHandler } = req;
    return nextHandler(req, res)
})


module.exports = router; 
