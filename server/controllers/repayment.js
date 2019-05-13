// eslint-disable-next-line import/no-extraneous-dependencies
import repayment from '../model/repayment';
import loan from '../model/loans';


class repaymentController {
  static postRepayment(req, res) {
    const id = parseFloat(req.params.id, 10);
    const loanApplied = loan.find(loans => loans.id === id);
    const amountPaid = parseFloat(req.body.paidAmount);
    if (loanApplied) {
      if (loanApplied.status !== 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'This loan is yet to be appproved',
        });
      }
      if (amountPaid > loanApplied.balance) {
        return res.status(400).send({
          status: 400,
          error: 'You have am outstanding loan',
        });
      }
      if (amountPaid <= loanApplied.balance) {
        loanApplied.balance -= amountPaid;
        const {
          createdOn, amount, balance, paymentInstallment,
        } = loanApplied;
        const newData = {
          id,
          amount,
          createdOn,
          balance,
          paymentInstallment,
          loanId: loanApplied,
          amountPaid,
        };
        if (loanApplied.balance === 0) {
          loanApplied.repaid = true;
          return res.status(200).send({
            status: 200,
            message: 'loan is fully repaid',
          });
        }
        repayment.push(newData);
        return res.status(200).send({
          status: 200,
          data: newData,
        });
      }
    }
    return res.status(404).send({
      status: 404,
      error: 'No loan found',
    });
  }

  static getRepaymentHistory(req, res) {
    const { id } = req.params;
    const getArepayment = repayment.filter(
      repaymentmodel => repaymentmodel.loanId === parseInt(id, 10),
    );
    if (getArepayment.length !== 0) {
      return res.status(200).send({
        status: 200,
        data: getArepayment,
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'No repayment is foumd',
    });
  }
}
export default repaymentController;
