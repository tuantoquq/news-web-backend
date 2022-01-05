const db = require("../model");
const httpStatus = require("../utils/httpStatus");
const Perspectives = db.perspective;
const perspectiveController = {};

perspectiveController.getAllPerspective = async (req, res, next) => {
  try {
    let listPerspective = await Perspectives.find();
    if (!listPerspective) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "Collection perspectives is empty!",
      });
    }
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "Get list perspective successfully!",
      data: listPerspective,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

perspectiveController.getPerspectiveByAuthor = async (req, res, next) => {
  try {
      const authorName = req.body.authorName;
      let perspectives = await Perspectives.find({
          author: authorName
      });
      if(!perspectives){
          return res.status(httpStatus.NOT_FOUND).send({
              code: httpStatus.NOT_FOUND,
              message: "No satisfactory documents were found"
          })
      }
      return res.status(httpStatus.OK).send({
        code: httpStatus.OK,
        message: "Get list perspective by author successfully!",
        data: perspectives,
      });

  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};
module.exports = perspectiveController;
