const Router = require('express');
const router = new Router();
const controller = require('../login/authController');
const { check } = require('express-validator');
const authMiddleware = require('../../middlewaree/authMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check(
      'password',
      'Password must be greater than 4 and less than 10 characters'
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/counters', authMiddleware, controller.getCounters);
router.post('/addcounter', authMiddleware, controller.createCounter);
router.delete('/delcounter', authMiddleware, controller.deleteCounter);

module.exports = router;
