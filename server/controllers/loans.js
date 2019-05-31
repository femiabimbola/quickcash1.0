/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
import loans from '../model/loans';
import users from '../model/users';


class loansController {
  static loanCreation(req, res) {
    const auser = users.find(user => user.email === req.body.email);
    const userLoan = loans.find(loan => loan.user === auser);
    if (auser.status === 'unverified') {
      return res.status(400).json({
        status: 400,
        message: 'Re-apply after verification',
      });
    }
    if (userLoan.repaid === true) {
      const amount = parseFloat(req.body.amount);
      const tenor = parseFloat(req.body.tenor);
      const interest = parseFloat(0.05 * amount).toFixed(2);
      const paymentInstallment = parseFloat((amount + interest) / tenor).toFixed(2);
      const newLoan = {
        id: loans.length + 1,
        user: req.body.email,
        createdOn: moment().format('llll'),
        status: 'pending',
        repaid: false,
        tenor,
        amount,
        PaymentInstallment: paymentInstallment,
        balance: amount + interest,
        Interest: interest,
        modifiedOn: moment().format('llll'),
      };
      loans.push(newLoan);
      return res.status(201).json({
        status: 201,
        NewData: newLoan,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No usert found, Kindly register',
    });
  }

  static getAllLoans(req, res) {
    const loansdb = loans;
    const loanCount = loansdb.length;
    return res.status(200).json({
      status: 200,
      Loans: loansdb,
      TotalLoans: loanCount,
    });
  }

  static getAloan(req, res) {
    const allLoans = loans;
    const { id } = req.params;
    const oneLoan = allLoans.find(aLoan => aLoan.id === parseInt(id, 10));
    if (!oneLoan) {
      return res.status(404).json({
        status: 404,
        message: 'No loan Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: oneLoan,
    });
  }

  static loanApporval(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const userLoan = loans.find(loanmodel => loanmodel.id === parseInt(id, 10));
    if (!userLoan) {
      return res.status(404).send({
        status: 404,
        error: 'Loan is not found',
      });
    }
    if (userLoan.status === 'approved') {
      return res.status(409).send({
        status: 409,
        error: 'Loan has been appproved',
      });
    }
    userLoan.status = status;
    const approvedloan = {
      loanId: userLoan.id,
      loanAmount: userLoan.amount,
      tenor: userLoan.tenor,
      status: userLoan.status,
      installment: userLoan.paymentInstallment,
      interest: userLoan.interest,
    };

    return res.status(200).send({
      status: 200,
      data: approvedloan,
    });
  }
}


export default loansController;
