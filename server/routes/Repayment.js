import express from 'express';
import repaymentController from '../controllers/repayment';
import Authorization from '../middlewares/verifer';

const repaymentRouter = express.Router();

// to post repayment
repaymentRouter.post('/loans/:id/repayment', Authorization.verifyAdmin, repaymentController.postRepayment); //

// to get repayment History
repaymentRouter.get('/loans/:id/repayment', Authorization.verifyUser, repaymentController.getRepaymentHistory);


export default repaymentRouter;
