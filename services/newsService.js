const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbName = 'news';

const client = new MongoClient(process.env.MONGO_CLIENT_URL, {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getNewsCollection() {
  const database = client.db(dbName);
  return database.collection('news');
}

async function addNewsToCollection(newsData){
    const newsCollection = getNewsCollection();
    await newsCollection.deleteMany({});
    await newsCollection.insertMany(newsData);
}

module.exports = {
  connectToDatabase,
  getNewsCollection,
  addNewsToCollection
};