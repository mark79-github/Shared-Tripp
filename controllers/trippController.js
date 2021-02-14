const {Router} = require('express');
const {trippService} = require('../services');
const {isLogged, isCreator, validate} = require('../middlewares');

const router = Router();

router.get('/', (req, res, next) => {
    trippService.getAll()
        .then((tripps) => {
            res.render('home/home', {tripps});
        })
        .catch(next);
});

router.get('/create', isLogged, (req, res) => {
    res.render('tripps/create');
});

router.post('/create', isLogged, validate.tripp.create, (req, res, next) => {
    trippService.create(req.body, req.user.id)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
});

router.get('/details/:trippId', isLogged, isCreator, (req, res, next) => {
    trippService.getById(req.params.trippId, true)
        .then((tripp) => {
            res.render('tripps/details', {...tripp});
        })
        .catch(next);
});

router.get('/delete/:trippId', isLogged, (req, res, next) => {
    trippService.remove(req.params.trippId)
        .then(() => {
            res.redirect('/');
        })
        .catch(next);
});

router.get('/join/:trippId', isLogged, (req, res, next) => {
    trippService.join(req.params.trippId, req.user.id)
        .then((tripp) => {
            res.redirect(`/tripps/details/${tripp._id}`);
        })
        .catch(next);
});

module.exports = router;