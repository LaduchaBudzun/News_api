require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { connectToDatabase } = require('./services/newsService');
const newsRouter = require('./routers/newsRouter');

const app = new Koa();
const PORT = process.env.PORT || 3005;

connectToDatabase();

app.use(bodyParser());
app.use(newsRouter.routes());
app.use(newsRouter.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});