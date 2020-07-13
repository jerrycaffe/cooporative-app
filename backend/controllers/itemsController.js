import { item } from "../models";

const addItems = async (req, res, next) => {
  const image = req.file;

  const { id } = req.user;
  let { unit, unit_amount, name, description, selling_price } = req.body;
console.log(description, selling_price)
  const allowedTypes = ["image/png", "image/jpeg"];

  if (image === undefined) {
    return res.status(400).json({
      status: 400,
      error: "Please select an image for the item"
    });
  }

  if (allowedTypes.indexOf(image.mimetype) === -1) {
    return res.status(400).json({
      status: 400,
      message: "Please upload a jpg, jpeg or png file"
    });
  }

  if (!name || !description) {
    return res.status(400).json({
      status: 400,
      error: "fill the name and description of the product"
    });
  }
  if (
    !unit_amount ||
    unit_amount.match(/[^0-9]/g) ||
    !selling_price ||
    selling_price.match(/[^0-9]/g)
  ) {
    return res.status(400).json({
      status: 400,
      error: "Please input unit amount and selling price in number"
    });
  }

  unit = !unit ? 1 : unit;

  const total_amount = unit * unit_amount;
  const profit = (selling_price * unit) - total_amount;
  try {
    const newItem = await item.create({
      added_by: id,
      unit,
      unit_amount,
      total_amount,
      img_url: image.path,
      profit,
      name,
      selling_price,
      description
    });

    if (newItem) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "You have successfully added the item"
      });
    }

    return res.status(500).json({
      status: 500,
      success: false,
      message: "Something went wrong please try again later"
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};

export { addItems };
