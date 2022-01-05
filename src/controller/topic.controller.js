const db = require("../model");
const httpStatus = require("../utils/httpStatus");
const Topic = db.topic;
const topicController = {};

topicController.getAllTopic = async (req, res, next) => {
  try {
    let allTopics = await Topic.find();
    if (!allTopics) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "No topic in database",
      });
    }
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "get all topic successfully!",
      data: allTopics,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

topicController.getListMainTopic = async (req, res, next) => {
    try {
      let listTopics = await Topic.find({
          type: 1
      });
      if (!listTopics) {
        return res.status(httpStatus.NOT_FOUND).send({
          code: httpStatus.NOT_FOUND,
          message: "No main topic in database",
        });
      }
      return res.status(httpStatus.OK).send({
        code: httpStatus.OK,
        message: "get list main topic successfully!",
        data: listTopics,
      });
    } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        code: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    }
  };

module.exports = topicController;