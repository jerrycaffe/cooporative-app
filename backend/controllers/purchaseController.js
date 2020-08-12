import { item, staff, purchase, saving, loan } from "../models";
import { isEmpty, isNumberValid } from "../middleware/validate";

const makePurchase = async (req, res, next) => {
  const staff_id = req.user.id;
  const itemId = req.params.itemId;
  let { quantity } = req.body;
  // check if the item exist

  // you must have savings
  // savings balance must be greater than loan balance

  if (!isEmpty(quantity) && !isNumberValid(quantity)) {
    return res.status(400).json({
      status: 400,
      error: "Ensure item quantity is in number greater or equal to 1"
    });
  }
  if (!isEmpty(quantity) && quantity < 1) {
    return res.status(400).json({
      status: 400,
      error: "Quantity must be a number greater or equal to 1 "
    });
  }
  quantity = quantity ? parseInt(quantity) : 1;

  try {
    const getItem = await item.findOne({
      where: { id: itemId }
    });

    if (!getItem) {
      return res.status(404).json({
        status: 404,
        error: "You cannot purchase an item that does not exist"
      });
    }

    if (parseInt(getItem.unit) === 0) {
      return res.status(400).json({
        status: 400,
        error:
          "This item is not available at the moment please check back later"
      });
    }
    if (quantity > getItem.unit) {
      return res.status(400).json({
        status: 400,
        error: `Sorry we have limited item of ${getItem.unit} left, kindly review the quantity ordered to be lesser or eqaul to the quantity remaining`
      });
    }

    const savingsBalance = await saving.findOne({
      attributes: ["balance"],
      where: { staff_id },
      order: [["updatedAt", "DESC"]]
    });

    //check if a user has savings
    if (!savingsBalance) {
      return res.status(400).json({
        status: 400,
        error: "You do not have savings therefore you cannot make a purchase"
      });
    }

    let loanBalance = await loan.findOne({
      attributes: ["balance"],
      where: { staff_id },
      order: [["updatedAt", "DESC"]]
    });

    // if a user has a loan, return the balance, else return 0
    loanBalance = loanBalance ? parseInt(loanBalance.dataValues) : 0;

    // check if the loan balance is greater than savings

    if (savingsBalance.dataValues < loanBalance.dataValues) {
      return res.status(400).json({
        status: 400,
        error:
          "Sorry You are not elligible to purchase an item because you have more loans to be paid, kindly see an admin for more clarification"
      });
    }

    // update item
    const newItemUnit = parseInt(getItem.unit) - quantity;
    const updateItem = await getItem.update({ unit: newItemUnit });
    if (!updateItem) {
      return res.status(500).json({
        status: 500,
        error: "Unable to complete this transaction please try again later"
      });
    }
    const itemPurchase = await purchase.create({
      staff_id,
      quantity
    });
    if (itemPurchase) {
      return res.status(201).json({
        status: 201,
        message:
          "You have made a purchase request please check back to see if your request is approved"
      });
    }
    return res.status(500).json({
      status: 500,
      error:
        "Something went wrong while trying tto process your request please try again later"
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};

export { makePurchase };
