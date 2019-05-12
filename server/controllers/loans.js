/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
import loans from '../model/loans';
import users from '../model/users';
// import validator from '../helpers/validators';


class loansController {
  static loanCreation(req, res) {
    const auser = users.find(user => user.email === req.body.email);
    /* if (auser.status !== 'verified') {
      return res.status(400).json({
        status: 400,
        message: 'Re-apply after verification',
      });
    } */

    if (loans.find(loan => loan.user === req.body.email)) { // check
      return res.status(400).json({
        status: 400,
        error: 'You have an outstanding loan',
      });
    }
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

  // static loanApporval(req, res) {
}


export default loansController;
