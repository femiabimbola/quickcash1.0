import express from 'express';
import loanController from '../controllers/loans';

const router = express.Router();

// To create a loan
router.post('/loans/', loanController.loanCreation);

// Get all loans application
router.get('/loans?status=approved&repaid=false', loanController.getAllLoans);

router.get('/loan', loanController.getAllLoans);
// Get a loan application
router.get('/loans/:id', loanController.getAloan);

// To approve a loan
// router.patch('/loans/:1d', loanController.approveLoan);

module.exports = router;
