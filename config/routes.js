const {Router} = require('express');
const router = Router();

const {userController, homeController, errorController, trippController} = require('../controllers');

router.use('/', homeController);
router.use('/users', userController);
router.use('/tripps', trippController);
router.use('*', errorController);

module.exports = router;
