const db = require("../model");
const httpStatus = require("../utils/httpStatus");
const News = db.news;


class SearchController {
  async searchByTitle(req, res, next) {
    try {
      const queryParam = req.body.q
      const regParm = { $regex: queryParam, $options: 'i' }
      const news = await News.find({
        $or: [
          { title: regParm },
          { description: regParm }
        ]
      }).exec();

      if (!news) {
        return res.status(httpStatus.NOT_FOUND).send({
          code: httpStatus.NOT_FOUND,
          message: "News not found!",
        });
      }
      return res.status(httpStatus.OK).send({
        code: httpStatus.OK,
        message: "get news by news_id successfully!",
        data: news,
      });
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
  }


}
module.exports = new SearchController