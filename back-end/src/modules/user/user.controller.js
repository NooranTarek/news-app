import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {User} from '../../../databse/models/user.js'
import { catchAsyncErr } from "../../utilities/catchErr.js";
import { logger } from "../../../index.js";
import {sendCodeEmail} from '../../utilities/forget_email.js'
import { saveLoginAttempt } from "../history/history.controller.js";
uuidv4();

//====================1)signUp ====================
const signup = catchAsyncErr(async (req, res, next) => {
    const { fullName,email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        logger.warn(`Attempt to register with already used email: ${email}`);
        return res.status(400).json({ message: "email is already in use" });
      }
  
      const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
  
      await User.insertMany({
        fullName,
        email,
        password: hash,
      });  
      logger.info(`User registered successfully: ${email}`);
      res.status(201).json({ message: "inserted success" });
    } catch (error) {
      logger.error(`Error during user registration: ${error.message}`);
      next(error); 
    }
  });
  


//====================2)signIn ====================
const signin = catchAsyncErr(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  const success = user && await bcrypt.compare(password, user.password);
  await saveLoginAttempt(email, success);
  if (!user || !success) {
    return res.json({ message: "Incorrect email or password" });
  }
  user.password = undefined;
  const token = jwt.sign({ user }, process.env.JWT_KEY);
  const role = user.role;
  res.json({ message: "Login successful", token, role });
});


//====================4)forget Password ====================
const forgetPassword = catchAsyncErr(async (req, res) => {
  let { email } = req.body;
  const code = uuidv4();
  await User.findOneAndUpdate({ email }, { code });
  const user = sendCodeEmail(email,"forget password !",`<h1>code:<span>${code}</span></h1>`);
  return user
    ? res.json({ message: "code sent successfully " })
    : res.json({ message: "not exist" });
});

//====================5)reset Password ====================
const resetPassword = catchAsyncErr(async (req, res) => {
  let { email, code, password } = req.body;
  let user = await User.findOne({ email });
  if (user && code == user.code) {
    const hash = bcrypt.hashSync(password, Number(process.env.ROUND));
    const user = await User.findOneAndUpdate(
      { email },
      { password: hash, $unset: { code: 1 } }
    );
    if (user) {
      res.json({ message: "code valid and password reset successfully " });
    }
  }
  else {
    res.json({ message: "code invalid and not matched" })
  }
});



export {
    signup,
    signin,
    forgetPassword,
    resetPassword

};
