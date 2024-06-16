import { catchAsyncErr } from '../../utilities/catchErr.js';
import { LoginHistory } from '../../../databse/models/loginHistory.js';

const saveLoginAttempt = async (email, success) => {
  const log = new LoginHistory({
    email: email,
    success: success
  });
  await log.save();
};

const getAllLoginLogs = catchAsyncErr(async (req, res) => {
  const logs = await LoginHistory.find();
  res.json(logs);
});

export {
   saveLoginAttempt,
  getAllLoginLogs
};
