const db = require("../model");
const httpStatus = require("../utils/httpStatus");
const Author = db.author;
const authorController = {};

authorController.getAuthorById = async (req, res, next) => {
  try {
    const authorId = req.body.authorId;
    let author = await Author.findOne({
      author_id: authorId,
    });
    if (!author) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "Author not found!",
      });
    }
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "get author by author_id successfully!",
      data: author,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

authorController.getAuthorByName = async (req, res, next) => {
  try {
    const authorName = req.body.authorName;
    let author = await Author.findOne({
      name: authorName,
    });
    if (!author) {
      return res.status(httpStatus.NOT_FOUND).send({
        code: httpStatus.NOT_FOUND,
        message: "Author not found!",
      });
    }
    return res.status(httpStatus.OK).send({
      code: httpStatus.OK,
      message: "get author by name successfully!",
      data: author,
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      code: httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }
};

module.exports = authorController;
