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
    const findStaff = await saving.findOne({where: {staff_id}, include: ['account_owner']});
    // const savingsRecord = await saving.findOne({where: {staff_id}, include: {model: staff}})
    console.log(findStaff, staff_id);

    // if (!findStaff) {
    //   return res.status(400).json({
    //     error: "You cannot upload the account of a non existing user"
    //   });
    // }

    // if (findStaff.dataValues.status === "deactivated") {
    //   return res.status(400).json({
    //     error:
    //       "This staff is not active on this platform review the staff status before updating this account",
    //     status: 400
    //   });
    // }

    // const updloaded = await saving.create(
    //   {
    //     balance: amount_saved,
    //     amount_saved,
    //     posted_by,
    //     staff_id
    //   },
    //   { where: { staff_id } }
    // );
    // if(updloaded){

    //   return res.status(201).json({
    //     updloaded
    //   });
    // }

    return res.status(200).json({
      findStaff,
      status: 200
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};

export { uploadSavings };
