import { loan, staff, saving } from "../models";
import { isEmpty, isNumberValid } from "../middleware/validate";

const uploadSavings = async (req, res, next) => {
  const { amount_saved } = req.body;
  const posted_by = req.user.id;
  const { staff_id } = req.params;

  if (isEmpty(amount_saved) || !isNumberValid(amount_saved)) {
    return res.status(400).json({
      status: 400,
      error: "Please ensure amount saved is in numbers"
    });
  }
  try {
    // check if the user exist and the status is not deactivated
    const findStaff = await saving.findOne({
      where: { staff_id },
      include: ["account_owner"]
    });
    // const savingsRecord = await saving.findOne({where: {staff_id}, include: {model: staff}})

    if (!findStaff) {
      return res.status(404).json({
        error: "You cannot upload the account of a non existing user",
        status: 404
      });
    }
    const { status } = findStaff.dataValues.account_owner.dataValues;

    if (status === "deactivated") {
      return res.status(400).json({
        error:
          "This staff is not active on this platform review the staff status before updating this account",
        status: 400
      });
    }
    // get user balance
    const balance = findStaff.dataValues.balance;
    const newBalance = parseInt(balance) + parseInt(amount_saved);

    const updloaded = await saving.create(
      {
        balance: newBalance,
        amount_saved,
        posted_by,
        staff_id
      },
      { where: { staff_id } }
    );
    if (updloaded) {
      return res.status(201).json({
        message: "You have successfully updated this user saving",
        status: 201
      });
    } else
      return res.status(500).json({
        error: "Something went wrong try again later",
        status: 500
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const viewSavingHistory = async (req, res, next) => {
  try {
    const findAllSavings = await saving.findAll({
      include: ["account_owner", "processed_by"]
    });

    if (!findAllSavings) {
      return res.status(400).json({
        status: 200,
        message: "No result found"
      });
    }

    if (findAllSavings) {
      return res.status(200).json({
        status: 200,
        savingHistory: findAllSavings.map(result => {
          const {
            balance,
            staff_id,
            amount_saved,
            createdAt: savings_posted,
            account_owner,
            processed_by
          } = result.dataValues;
          if (result.dataValues.staff_id !== null)
            return {
              balance,
              id: staff_id,
              amount_saved,
              savings_posted,
              firstname: account_owner.firstname,
              lastname: account_owner.lastname,
              email: account_owner.email,
              phone_number: account_owner.phone_number,
              employed_as: account_owner.employed_as,
              branch: account_owner.branch,
              monthly_savings: account_owner.monthly_savings,
              account_number: account_owner.account_number,
              bank_name: account_owner.bank_name,
              adminFirstName: processed_by.firstname,
              adminLastName: processed_by.lastname,
              adminEmailAress: processed_by.email,
              adminPhoneNumber: processed_by.phone_number
            };
        })
        // count: findAllSavings.length + " results found",
      });
    } else
      return res.status(500).json({
        status: 500,
        message: "Something went wrong please try again"
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const viewSavingOneHistory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const findAllSavings = await saving.findAll({
      where: { staff_id: id },
      include: ["account_owner", "processed_by"]
    });

    if (!findAllSavings) {
      return res.status(400).json({
        status: 200,
        message: "No result found for this user"
      });
    }
    console.log(findAllSavings);

    if (findAllSavings) {
      return res.status(200).json({
        status: 200,

        savingHistory: findAllSavings.map(result => {
          const {
            balance,
            staff_id,
            amount_saved,
            createdAt: savings_posted,
            account_owner,
            processed_by
          } = result.dataValues;
          if (result.dataValues.staff_id !== null)
            return {
              balance,
              id: staff_id,
              amount_saved,
              savings_posted,
              firstname: account_owner.firstname,
              lastname: account_owner.lastname,
              email: account_owner.email,
              phone_number: account_owner.phone_number,
              employed_as: account_owner.employed_as,
              branch: account_owner.branch,
              monthly_savings: account_owner.monthly_savings,
              account_number: account_owner.account_number,
              bank_name: account_owner.bank_name,
              adminFirstName: processed_by.firstname,
              adminLastName: processed_by.lastname,
              adminEmailAress: processed_by.email,
              adminPhoneNumber: processed_by.phone_number
            };
        })
        // count: findAllSavings.length + " results found",
      });
    } else
      return res.status(500).json({
        status: 500,
        message: "Something went wrong please try again"
      });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const adminModifySaving = async (req, res, next) => {
  const { id } = req.params;
  const { amount_saved } = req.body;
  if (isEmpty(amount_saved) || !isNumberValid(amount_saved)) {
    return res.status(400).json({
      error: "Please input an amount in number",
      status: 400
    });
  }
  try {
    const transaction = await saving.findByPk(id);
    if(!transaction){
      return res.status(404).json({
        status: 404,
        error: "Transanction does not exist"
      })
    }
    const newBalance = parseInt(amount_saved) + parseInt(transaction.balance)
    const updated = await transaction.update({
      amount_saved,
      balance: newBalance
    })
    if(updated){
      
      return res.status(200).json({
        status: 200,
        message: "You have successfully updated this transaction"
      })
    }else {
      return res.status(500).json({
        error: "Something went wrong",
        status: 500
      })
    }
  } catch (error) {
    console.log(error)
    return next()
  }
};

export {
  uploadSavings,
  viewSavingHistory,
  viewSavingOneHistory,
  adminModifySaving
};
