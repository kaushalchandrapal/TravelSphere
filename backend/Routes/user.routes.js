

const express = require('express');
const userController = require('../Controllers/user.controller');
const router = express.Router();

router.get('/view', userController.viewUser);
router.get('/search', userController.getUserBySearch);
router.get('/view/:id', userController.viewUserById);
router.post('/create', userController.createUser);
router.post('/update/:id', userController.updateUserById);

module.exports = router;
