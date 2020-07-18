import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

import { staff, saving, item, purchase, loan, complaint } from "../models";
import models from "../models";
const addStaff = async (req, res, next) => {
  // get all variables from request body
  const {
    firstname,
    lastname,
    email,
    password,
    confirm_password,
    phone_number
  } = req.body;

  // check for any empty field before adding staff
  if (
    (!firstname, !lastname, !email, !password, !confirm_password, !phone_number)
  ) {
    return res.status(401).json({
      status: 401,
      error: "All fields are required"
    });
  }

  // check if there is an unwanted variable in name
  if (!firstname.match(/^[A-Za-z]+$/) || !lastname.match(/^[A-Za-z]+$/)) {
    return res.status(401).json({
      status: 401,
      error: "firstname and lastname must  be alphabets"
    });
  }
  // email format
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    return res.status(401).json({
      status: 401,
      error: "Email do not match correct format"
    });
  }

  // check if the phone number is 11 values
  const phoneNumStr = phone_number.split("");
  if (phoneNumStr.length !== 11 || phone_number.match(/[^0-9]/g)) {
    return res.status(401).json({
      status: 401,
      error: "Phone number must be 11 numbers"
    });
  }

  // check if password length is greater than 6
  if (password.length < 6) {
    return res.status(401).json({
      status: 401,
      error: "password must be greater than 6 characters"
    });
  }

  // cross cehck confirm password
  if (password !== confirm_password) {
    return res.status(409).json({
      status: 409,
      error: "password and confirm password must match"
    });
  }

  //Deal with db when after validations
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // check if the either the name or the password exist in the db
    const checkUser = await staff.findAll({
      where: {
        email,
        phone_number
      }
    })
    
    
    // check if the result of check is not empty
    if (checkUser.length) {
      return res.status(409).json({
        status: 409,
        success: false,
        message:
          "User with this email and phone number already exist please provide another email and phone number to add staff"
      });
    }

    // store the user in the db if all went well
    const createdStaff = await staff.create({
      firstname,
      lastname,
      password: hashedPassword,
      email,
      phone_number
    });
    // if created staff returns a result then let user know record has been created
    if (createdStaff) {
      return res.status(201).json({
        status: 201,
        success: true,
        message: "You have successfully added a staff"
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }

  return res.status(503).json({
    status: 503,
    message: "Unable to complete your request at this time please try later"
  });
};

const staffLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      error: "email and password is required"
    });
  }
  try {
    const checkStaff = await staff.findOne({
      where: {
        email
      }
    });

    if (!checkStaff) {
      return res.status(404).json({
        status: 404,
        error: "User does not exist"
      });
    }
    // check if user account is not deactivated

    if (checkStaff.dataValues.status === "deactivated") {
      return res.status(403).json({
        status: 403,
        success: false,
        message: "Your account has been deactivated contact the management"
      });
    }

    const passwordMatch = await bcrypt.compare(password, checkStaff.password);
    if (passwordMatch) {
      const { id, role } = checkStaff.dataValues;
      const payload = {
        id,
        role
      };

      // sign jwt with the details
      jwt.sign(
        payload,
        process.env.secretOrkey,
        { expiresIn: 10800000 },
        (error, token) => {
          if (error) throw error;

          return res.status(200).json({
            status: 200,
            message: "You have successfully logged in",
            token: `Bearer ${token}`
          });
        }
      );
    } else
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Incorrect Password"
      });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const adminViewAll = async (req, res, next) => {
  try {
    const allStaff = await staff.findAll({
      attributes: [
        "firstname",
        "lastname",
        "email",
        "dob",
        "phone_number",
        "address",
        "img_url",
        "employed_as",
        "branch",
        "monthly_savings",
        "account_number",
        "bank_name",
        "status"
      ],
      where: { role: "user" }
    });

    return res.status(200).json({
      status: 200,
      count: allStaff.length,
      message: allStaff
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const adminViewOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const allStaff = await staff.findOne({
      attributes: [
        "firstname",
        "lastname",
        "email",
        "dob",
        "phone_number",
        "address",
        "img_url",
        "employed_as",
        "branch",
        "monthly_savings",
        "account_number",
        "bank_name",
        "status"
      ],
      where: { id, role: "user" },
      include: [
        { model: saving },
        { model: item },
        { model: loan },
        { model: purchase },
        { model: complaint }
      ]
    });

    return res.status(200).json({
      status: 200,
      message: allStaff
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};

const adminViewBranch = async (req, res, next) => {
  const { branch } = req.body;
  if (!branch) {
    return res
      .status(400)
      .json({ status: 400, error: "Please select a branch" });
  }
  try {
    const allStaff = await staff.findAll({
      attributes: [
        "firstname",
        "lastname",
        "email",
        "dob",
        "phone_number",
        "address",
        "img_url",
        "employed_as",
        "branch",
        "monthly_savings",
        "account_number",
        "bank_name",
        "status"
      ],
      where: { role: "user", branch }
    });

    return res.status(200).json({
      status: 200,
      count: allStaff.length,
      message: allStaff
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};

export { addStaff, staffLogin, adminViewAll, adminViewOne, adminViewBranch };
