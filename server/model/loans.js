const loans = [

  {
    id: 1,
    user: 'solamike@mailinator.com',
    createdOn: Date(),
    status: 'pending',
    repaid: false,
    tenor: 6,
    amount: 22000.00,
    paymentInstallment: 2300.00,
    balance: 14000.00,
    interest: 1100,
  },

  {
    id: 2,
    user: 'solasmith@mailinator.com',
    createdOn: Date(),
    status: 'accepted',
    repaid: true,
    tenor: 4,
    amount: 22000.00,
    paymentInstallment: 2500.00,
    balance: 13000.00,
    interest: 0.05,
  },
];

export default loans;