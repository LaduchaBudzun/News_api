const Router = require('koa-router');
const newsController = require('../controllers/newsController');

const router = new Router();

router.get('/get-news', newsController.getNews);
router.post('/update-news', newsController.updateNewsById);
router.delete('/delete-news', newsController.deleteNewsById);
router.get('/fill-table', newsController.fillNewsTable);

module.exports = router;