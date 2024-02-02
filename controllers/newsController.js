const { default: axios } = require('axios');
const { getNewsCollection, addNewsToCollection } = require('../services/newsService');
const { ObjectId } = require('mongodb'); 

async function getNews(ctx) {
  try {
    const { sort, filter } = ctx.request.query;

    const validSortOptions = ['date', 'title'];
    if (sort && !validSortOptions.includes(sort)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid sort parameter' };
      return;
    }

    if (filter && !/^[a-zA-Z0-9\s]+$/.test(filter)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid filter parameter' };
      return;
    }

    let query = {};

    if (filter) {
      query = { title: { $regex: filter, $options: 'i' } };
    }

    const newsCollection = getNewsCollection();
    const cursor = newsCollection.find(query);

    if (sort) {
      if (sort === 'date') {
        cursor.sort({ publishedAt: -1 }); // sort by date
      } else if (sort === 'title') {
        cursor.sort({ title: 1 }); // sort by title A->Z
      }
    }

    const news = await cursor.toArray();
    ctx.body = news;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    console.error('Error fetching news:', error);
  }
}

async function updateNewsById(ctx) {
  try {
    const { id } = ctx.request.body;
    const newsCollection = getNewsCollection();

    if (!ObjectId.isValid(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid news ID' };
      return;
    }

    const { title, description, content } = ctx.request.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (content) updateData.content = content;

    const result = await newsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      ctx.status = 404;
      ctx.body = { error: 'News not found' };
      return;
    }

    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    console.error('Error updating news:', error);
  }
}

async function deleteNewsById(ctx) {
  try {
    const { id } = ctx.request.body;
    const newsCollection = getNewsCollection();

    if (!ObjectId.isValid(id)) {
      ctx.status = 400;
      ctx.body = { error: 'Invalid news ID' };
      return;
    }

    const result = await newsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      ctx.status = 404;
      ctx.body = { error: 'News not found' };
      return;
    }

    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
    console.error('Error deleting news:', error);
  }
}

async function fillNewsTable(ctx){
  try {
      const response = await axios.get('https://newsapi.org/v2/everything?q=crypto&apiKey=819fb94ba7f94a4c81b28ef32b583f12');
  
      const newsData = response.data.articles;
      addNewsToCollection(newsData)
  
      ctx.body = {status:'done'};
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
      console.error('Error fetching news from API:', error);
    }
}

module.exports = {
  updateNewsById,
  getNews,
  deleteNewsById,
  fillNewsTable
};
