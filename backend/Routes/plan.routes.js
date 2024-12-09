

const express = require('express');
const planController = require('../Controllers/plan.controller');
const { decodeToken } = require('../Helpers');
const router = express.Router();


router.get('/',planController.viewPlan);
router.get('/:id',planController.viewPlanById);
router.post('/create',decodeToken ,planController.createPlan);
router.delete('/delete/:id',planController.deletePlan);
router.put('/update/:id',planController.updatePlan);
router.post('/mail/sendmail',planController.sendEmail)

module.exports = router;