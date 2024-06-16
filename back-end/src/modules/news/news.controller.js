
import axios from 'axios';
import { catchAsyncErr } from '../../utilities/catchErr.js';
import { User } from '../../../databse/models/user.js';


const getNewsForSubscribedSources = catchAsyncErr(async (req, res) => {
    const userId = req.user.user._id;
    const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  let allArticles = [];

  for (let sourceId of user.subscribedSources) {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=e6e8e22f190b4663bf5bc956fcca6469`);
    const articles = response.data.articles;
    
    allArticles = [...allArticles, ...articles];
  }

  res.status(200).json(allArticles);
});




export {
    getNewsForSubscribedSources,

};
