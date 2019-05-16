// eslint-disable-next-line import/no-extraneous-dependencies
import repayment from '../model/repayment';
import loan from '../model/loans';


class repaymentController {
  static postRepayment(req, res) {
    const id = parseFloat(req.params.id, 10);
    const loanApplied = loan.find(loans => loans.id === id);
    if (loanApplied) {
      if (loanApplied.status !== 'accepted') {
        return res.status(400).send({
          status: 400,
          error: 'This loan is yet to be appproved',
        });
      }
    }
    if (loanApplied.balance === 0 || loanApplied.repaid === true) {
      return res.status(200).send({
        status: 200,
        message: 'loan is fully repaid, you may ask for another loan',
      });
    }

    const newData = {
      id: repayment.length + 1,
      createdOn: Date(),
      loanId: loanApplied.id,
      amount: loanApplied.amount,
    };
    repayment.push(newData);
    return res.status(200).send({
      status: 200,
      data: newData,
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
