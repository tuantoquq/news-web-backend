const db = require("../model");
const httpStatus = require("../utils/httpStatus");
const Comment = db.comment;
const User = db.user;
const commentController = {};

//get all comment of a news 
commentController.getListCommentOfNews = async (req, res, next) => {
    try{
        let newsId = req.body.news_id;
        let listComments = await Comment.find({news_id: newsId});
        console.log(listComments);
        if(!listComments){
            return res.status(httpStatus.NO_CONTENT).send({
                code: httpStatus.NO_CONTENT,
                message: "No comment for this news"
            });
        }
        return res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            message: "get list comments successfully!",
            data: listComments
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
          });
    }
}
//get number of comment in a news
commentController.countNumberCommentOfNews = async (req, res, next) => {
    try{
        let newsId = req.body.news_id;
        let listComments = await Comment.find({news_id: newsId});
        if(!listComments){
            return res.status(httpStatus.NO_CONTENT).send({
                code: httpStatus.NO_CONTENT,
                message: "No comment for this news"
            });
        }
        return res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            message: "Count number of comments successfully!",
            data: {
                number_comments: listComments.list_comment.length,
                
            }
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
          });
    }
}

//add comment for a news 
commentController.addCommentForNews = async (req, res, next) => {
    try{
        let userId = req.userId;
        let user = await User.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                code: httpStatus.UNAUTHORIZED,
                message: "Unauthorized",
            });
        }
        let newsId = req.body.news_id;
        let comment = {
            user_id: userId,
            content: req.body.content,
            timestamp: Date.now()
        }
        let listComments = await Comment.find({news_id: newsId});
        if(listComments.length != 0){
            await Comment.findOneAndUpdate(
                {news_id: newsId},
                {$push:{
                    list_comment: comment
                }}
            );
        }else{
            await Comment.insertMany({
                news_id: newsId,
                list_comment:[
                    comment
                ]
            });
        }
        let rsListComments = await Comment.find({news_id: newsId});
        console.log(rsListComments);
        return res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            message: "add comment successfully!",
            data: rsListComments
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
    }
}

//update comment of news 
commentController.updateCommentOfNews = async (req, res, next) => {
    // try{

    // }catch(err){
    //     return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    //         code: httpStatus.INTERNAL_SERVER_ERROR,
    //         message: err.message,
    //       });
    // }
}

module.exports = commentController;