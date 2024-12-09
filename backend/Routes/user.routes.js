

const express = require('express');
const userController = require('../Controllers/user.controller');
const { decodeToken } = require('../Helpers');
const multer = require('multer');
const router = express.Router();



// const handleImage = (req,res,next) =>{
//     console.log(req.body)
//     if(req.body?.profilePic){
//         upload.single("profilePic");
//         console.log('req.file' , req.file)
//         next();
//     }else{
//         next();
//     }
// }

router.get('/view', userController.viewUser);
router.get('/search', userController.getUserBySearch);
router.get('/view/:id', userController.viewUserById);
router.post('/create', userController.createUser);
router.post('/update/:id',decodeToken , userController.updateUserById);

module.exports = router;
