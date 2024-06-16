import axios from 'axios';
import { catchAsyncErr } from "../../utilities/catchErr.js";
import { Source } from '../../../databse/models/source.js';
import { User } from '../../../databse/models/user.js';


const fetchAndCheckSource = async (sourceId) => {
  const response = await axios.get(`https://newsapi.org/v2/sources?apiKey=e6e8e22f190b4663bf5bc956fcca6469`);
  const sources = response.data.sources;
  const sourceData = sources.find(source => source.id === sourceId);

  if (!sourceData) {
    throw new Error('Source not found');
  }

  let source = await Source.findOne({ sourceId: sourceId });
  if (!source) {
    source = new Source({
      sourceId: sourceData.id,
      name: sourceData.name,
      description: sourceData.description,
      url: sourceData.url,
      category: sourceData.category,
      language: sourceData.language,
      country: sourceData.country,
      subscribers: 0
    });
    await source.save();
  }

  return source;
};

const subscribeToSource = catchAsyncErr(async (req, res) => {
  const userId = req.user.user._id;
  const {sourceId } = req.body;

  const source = await fetchAndCheckSource(sourceId);

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.subscribedSources.includes(source.sourceId)) {
    return res.status(400).json({ message: 'Already subscribed to this source' });
  }

  user.subscribedSources.push(source.sourceId);
  await user.save();

  source.subscribers += 1;
  await source.save();

  res.status(200).json({ message: 'Subscribed to source successfully' });
});

const unsubscribeFromSource = catchAsyncErr(async (req, res) => {
  const userId = req.user.user._id;
  const {sourceId } = req.body;

  const source = await fetchAndCheckSource(sourceId);

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.subscribedSources.includes(source.sourceId)) {
    return res.status(400).json({ message: 'Not subscribed to this source' });
  }

  user.subscribedSources = user.subscribedSources.filter(id => id !== source.sourceId);
  await user.save();

  source.subscribers -= 1;
  await source.save();

  res.status(200).json({ message: 'Unsubscribed from source successfully' });
});
const getAllSources = catchAsyncErr(async (req, res) => {
    const response = await axios.get(`https://newsapi.org/v2/sources?apiKey=e6e8e22f190b4663bf5bc956fcca6469`);
    const sources = response.data.sources;
  
    res.status(200).json(sources);
  });
 const getPopularSources = catchAsyncErr(async (req, res) => {
    const response = await Source.find().sort({ subscribers: -1 }).limit(5);
  
    res.status(200).json(response);
  });
export {
  subscribeToSource,
  unsubscribeFromSource,
  getAllSources,
  getPopularSources
};
