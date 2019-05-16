import express from 'express';
import loanController from '../controllers/loans';
import Authorization from '../middlewares/verifer'

const loanRouter = express.Router();

// To create a loan
loanRouter.post('/loans', Authorization.verifyUser, loanController.loanCreation);

// Get all loans application
loanRouter.get('/loans?status=approved&repaid=false', Authorization.verifyAdmin, loanController.getAllLoans);


// Get a specific loan application
loanRouter.get('/loans/:id', Authorization.verifyAdmin, loanController.getAloan);


module.exports = loanRouter;
