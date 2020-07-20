import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

import { staff, saving, item, purchase, loan, complaint } from "../models";
import models from "../models";

import {
  isNameValid,
  isEmpty,
  isEmailValid,
  isPhoneNumberValid,
  isPasswordValid,
  isNumberValid
} from "../middleware/validate";


const addStaff = async (req, res, next) => {
  // get all variables from request body
  const validateError = (error, code) => {
    return res.status(code).json({
      code,
      error
    });
  };
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
    isEmpty(firstname) ||
    isEmpty(lastname) ||
    isEmpty(email) ||
    isEmpty(password) ||
    isEmpty(confirm_password) ||
    isEmpty(phone_number)
  ) {
    return res.status(401).json({
      status: 401,
      error: "All fields are required"
    });
  }

  // check if there is an unwanted variable in name
  if (!isNameValid(firstname) || !isNameValid(lastname)) {
    return res.status(401).json({
      status: 401,
      error: "firstname and lastname must  be alphabets"
    });
  }
  // email format

  if (!isEmailValid(email)) {
    return res.status(401).json({
      status: 401,
      error: "Email do not match correct format"
    });
  }

  // check if the phone number is 11 values

  if (!isPhoneNumberValid(phone_number)) {
    return res.status(401).json({
      status: 401,
      error: "Phone number must be 11 numbers"
    });
  }

  // check if password length is greater than 6
  if (!isPasswordValid(password)) {
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
    });

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

  if (isEmpty(email) || isEmpty(password)) {
    return res.status(400).json({
      status: 400,
      error: "email and password is required"
    });
  }
  if (!isEmailValid(email)) {
    return res.status(401).json({
      status: 401,
      error: "Invalid email field"
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
  if (isEmpty(branch)) {
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

const staffProfile = async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    if (userId != id) {
      return res.status(403).json({
        status: 403,
        error: "You cannot view this resource"
      });
    }

    const profile = await staff.findOne({
      where: { id: userId },
      include: [
        { model: saving },
        { model: item },
        { model: loan },
        { model: purchase },
        { model: complaint }
      ]
    });

    const {
      firstname,
      lastname,
      email,
      dob,
      phone_number,
      address,
      img_url,
      employed_as,
      monthly_savings,
      account_number,
      bank_name,
      savings,
      items,
      loans,
      purchases,
      complaints
    } = profile.dataValues;

    return res.status(200).json({
      status: 200,
      user: {
        firstname,
        lastname,
        email,
        dob,
        phone_number,
        address,
        img_url,
        employed_as,
        monthly_savings,
        account_number,
        bank_name,
        savings,
        items,
        loans,
        purchases,
        complaints
      }
    });
  } catch (error) {
    console.log(error);
    next();
  }
};

const staffUpdateProfile = async (req, res, next) => {
  let image = req.file;
  const userId = req.user.id;
  const { id } = req.params;

  let {
    firstname: first_name,
    lastname: last_name,
    dob: d_o_b,
    phone_number: phoneNumber,
    address: homeAddress,
    branch: campus,
    employed_as: employedAs,
    monthly_savings: savings,
    account_number: accountNumber,
    bank_name: bankName
  } = req.body;

  if (userId != id) {
    return res.status(403).json({
      status: 403,
      error: "You cannot view this resource"
    });
  }
  if (image !== undefined && allowedTypes.indexOf(image.mimetype) === -1) {
    return res.status(400).json({
      status: 400,
      message: "Ensure your image is of type png or jpg"
    });
  }
  if (
    (!isEmpty(first_name) && !isNameValid(first_name)) ||
    (!isEmpty(last_name) && !isNameValid(last_name))
  ) {
    return res.status(400).json({
      error: "Make sure all names are in alphabets",
      status: 400
    });
  }
  if (!isEmpty(phoneNumber) && !isPhoneNumberValid(phoneNumber)) {
    return res.status(400).json({
      error: "Make sure phone number is 11 digit number",
      status: 400
    });
  }
  if(!isNumberValid(savings)){
    return res.status(400).json({
      error: "Make sure monthly savings is digits only",
      status: 400
    });
  }

  try {
    const findStaff = await staff.findByPk(id);
    let {
      lastname,
      firstname,
      dob,
      phone_number,
      address,
      employed_as,
      monthly_savings,
      account_number,
      bank_name,
      img_url,
      branch
    } = findStaff.dataValues;

    firstname = first_name ? first_name : firstname;
    lastname = last_name ? last_name : lastname;
    dob = d_o_b ? d_o_b : dob;
    phone_number = phoneNumber ? phoneNumber : phone_number;
    address = homeAddress ? homeAddress : address;
    image = image ? image.path : img_url;
    employed_as = employedAs ? employedAs : employed_as;
    branch = campus ? campus : branch;
    monthly_savings = savings ? savings : monthly_savings;
    account_number = accountNumber ? accountNumber : account_number;
    bank_name = bankName ? bankName : bank_name;

    const saveChanges = await findStaff.update({
      firstname,
      lastname,
      dob,
      phone_number,
      address,
      img_url: image,
      employed_as,
      branch,
      monthly_savings,
      account_number,
      bank_name
    });

    if (saveChanges) {
      return res.status(201).json({
        status: 201,
        message: "You have successfully updated your profile"
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Something went wrong try again later"
    });
  } catch (error) {
    console.log(error);
    return next();
  }
};
export {
  addStaff,
  staffLogin,
  adminViewAll,
  adminViewOne,
  adminViewBranch,
  staffProfile,
  staffUpdateProfile
};
