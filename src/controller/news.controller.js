const db = require("../model");
const httpStatus = require("../utils/httpStatus");
const News = db.news;
const newsController = {};

//get news by news_id
newsController.getNewsById = async (req, res, next) => {
  try {
    let newsId = req.body.newsId;
    const news = await News.findOne({
      news_id: newsId,
    });
    
    if (!news) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "News not found!",
      });
    }
    let currentViews = news.views;
    console.log(currentViews);
    await News.updateOne({news_id: newsId},{
      views: currentViews + 1
    });
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
};

//get hot news
newsController.getHotNews = async (req, res, next) => {
  try {
    let hotNews = await News.find().sort({ views: -1 }).limit(1);
    if (!hotNews) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "Collection is empty!",
      });
    }
    console.log(hotNews);
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "get hot news successfully!",
      data: hotNews,
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

//get hot topic
newsController.getHotNewsByTopic = async (req, res, next) => {};

//get the top 10 most viewed news
newsController.getTop10News = async (req, res, next) => {
  try {
    let hotNews = await News.find().sort({ views: -1 }).limit(10);
    if (!hotNews) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "Collection is empty!",
      });
    }
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "get top 10 hot news successfully!",
      data: hotNews,
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

//add news: ADMIN -> require admin role
newsController.addNews = async (req, res, next) => {
  try {
    let newsToAdd = {
      title: req.body.title,
      content: req.body.content,
      url_image: req.body.url_image,
      description: req.body.description,
      extend_description: req.body.extend_description,
      topic: req.body.topic,
    };
    let lastNews = await News.find().sort({ news_id: -1 }).limit(1);
    if (!lastNews) {
      newsToAdd.url = getUrlFromTitleAndId(newsToAdd.title, 1);
    } else {
      newsToAdd.news_id = lastNews[0].news_id + 1;
      newsToAdd.url = getUrlFromTitleAndId(newsToAdd.title, newsToAdd.news_id);
      newsToAdd.views = 0;
    }
    if(newsToAdd.url == null){
      return res.status(httpStatus.BAD_REQUEST).send({
        code: httpStatus.BAD_REQUEST,
        message: "failed to create URL!"
      });
    }
    console.log(newsToAdd);
    News.insertMany(newsToAdd);
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "insert successfully",
      data: newsToAdd,
    });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};
/**
 * create url from title and id of news
 * @param {String} title
 * @param {*} id
 * @returns
 */
function getUrlFromTitleAndId(title, id) {
  if (title == null) {
    return null;
  }
  title = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  let listWords = title
    .replace("'", "")
    .replace('"', "")
    .replace("?", "")
    .replace("!", "")
    .replace(".", "")
    .replace(",", "")
    .replace("/", "-")
    .split(" ");
  let rs = "http://localhost:3000/";
  for (let str in listWords) {
    rs += listWords[str] + "-";
  }
  rs += id + ".html";
  return rs;
}

//get views of news
newsController.countViews = async (req, res, next) => {
  try{
    let newsId = req.body.news_id;
    const news = await News.findOne({
      news_id: newsId,
    });

    if (!news) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "News not found!",
      });
    }
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "count views by news_id successfully!",
      data: {
        numberViews: news.views
      },
    });
  }catch(err){
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
}
module.exports = newsController;
