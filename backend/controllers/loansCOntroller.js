import { loan, staff, saving } from "../models";
import { isEmpty, isNumberValid } from "../middleware/validate";
const loanRequest = async (req, res, next) => {
  const { id } = req.params;
  const { amount, repayment, purpose } = req.body;

  if (isEmpty(amount) || isEmpty(repayment) || isEmpty(purpose)) {
    return res.status(400).json({
      status: 400,
      error: "Fill all the required fields to perform this transaction"
    });
  }

  if (!isNumberValid(amount) || !isNumberValid(repayment)) {
    return res.status(400).json({
      status: 400,
      error:
        "Amount to be collected should be in number while repayment should be the number of months"
    });
  }
  try {
    const findUser = await saving.findOne({where: {staff_id}})
    console.log("Found user",findUser)
    // check if user has loan
    // if(parseInt(findUser.dataValues.loans.balance))
    // check if user is eligible
    // check if the user has current loan
    // const sevenPercent = parseInt(amount) + (parseInt(amount)*(0.07))
    // const fivePer 
    // const interest = (repayment <= 12)? 
    // const updateLoan = await loan.update({
      // staff_id: id,
      // amount,
    //   interest: 
    // })
    // check user eligibility
  } catch (error) {
    console.log(error)
    return next()
  }
  return res.json({message: "it is ok"})
};

export { loanRequest };
