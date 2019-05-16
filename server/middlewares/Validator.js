import Schemas from './schemas';
import Helper from './handler';

class Validator {
  static validateSignUp(req, res, next) {
    try {
      const userSignUpDetails = Helper.signupDetailsHandler(req);
      const signupResult = Schemas.createUser(userSignUpDetails);

      if (signupResult.error) {
        const signupErrorMessage = signupResult.error.details[0].message;
        return Helper.errorMessageHandler(signupErrorMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }


  static validateLogin(req, res, next) {
    try {
      const userLoginDetails = Helper.loginDetailsHandler(req);
      const loginResult = Schemas.createLogin(userLoginDetails);

      if (loginResult.error) {
        const loginErrorMessage = loginResult.error.details[0].message;
        return Helper.errorMessageHandler(loginErrorMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }

  static validateLoan(req, res, next) {
    try {
      const loanDetails = Helper.loanDetailsHandler(req);
      const loanResult = Schemas.createLoan(loanDetails);

      if (loanResult.error) {
        const loanErrorMessage = loanResult.error.details[0].message;
        return Helper.errorMessageHandler(loanErrorMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }

  static validateRepayment(req, res, next) {
    try {
      const repaymentDetails = Helper.repaymentDetailsHandler(req);
      const repaymentResult = Schemas.createRepayment(repaymentDetails);
      if (repaymentResult.error) {
        const repaymentErrorMessage = repaymentResult.error.details[0].message;
        return Helper.errorMessageHandler(repaymentErrorMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }

  static validateLoanQuery(req, res, next) {
    try {
      const queryDetails = Helper.loanQueryHandler(req);
      const queryResult = Schemas.loanQuery(queryDetails);

      if (queryResult.error) {
        const queryErrorMessage = queryResult.error.details[0].message;
        return Helper.errorMessageHandler(queryErrorMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }


  static validateLoanApproval(req, res, next) {
    try {
      const approvalDetails = Helper.loanApprovalHandler(req);
      const approvalResult = Schemas.loanApproval(approvalDetails);

      if (approvalResult.error) {
        const approvalErrorMessage = approvalResult.error.details[0].message;
        return Helper.errorMessageHandler(approvalErrorMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }

  static validateId(req, res, next) {
    try {
      const id = Helper.idHandler(req);
      const idResult = Schemas.userId(id);
      if (idResult.error) {
        const idErrorMessage = idResult.error.details[0].message;
        return Helper.errorMessageHandler(idErrorMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }

  static validateVerification(req, res, next) {
    try {
      const verifyDetails = Helper.verificationHandler(req);
      const verificationResult = Schemas.userEmail(verifyDetails);

      if (verificationResult.error) {
        const verificationMessage = verificationResult.error.details[0].message;
        return Helper.errorMessageHandler(verificationMessage, res);
      }
      return next();
    } catch (e) {
      return Helper.errorResponseHandler(res);
    }
  }
}

export default Validator;
