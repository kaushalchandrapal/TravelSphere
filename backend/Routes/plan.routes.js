

const express = require('express');
const planController = require('../Controllers/plan.controller');
const router = express.Router();


router.get('/',planController.viewPlan);
router.get('/:id',planController.viewPlanById);
router.post('/create',planController.createPlan);
router.delete('/delete/:id',planController.deletePlan);
router.put('/update/:id',planController.updatePlan);
router.post('/mail/sendmail',planController.sendEmail)

module.exports = router;