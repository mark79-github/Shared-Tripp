const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home/home');
});

router.get('/create', (req, res) => {
    res.render('tripps/create');
});

router.post('/create', (req, res) => {
    res.send(req.body);
});

router.get('/details/:trippId', (req, res, next) => {
    res.render('tripps/details');
})

module.exports = router;