import express from 'express';
import repaymentController from '../controllers/repayment';

const router = express.Router();

// to post repayment
router.post('/loans/:id/repayment', repaymentController.postRepayment);

// to get repayment History
router.get('/loans/:id/repayment', repaymentController.getRepaymentHistory);


module.exports = router;
