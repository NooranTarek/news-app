import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {User} from '../../../databse/models/user.js'
import { catchAsyncErr } from "../../utilities/catchErr.js";
import { logger } from "../../../index.js";
// import sendCodeEmail from '../../utilities/forget_email.js'
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
  


export {
    signup

};
