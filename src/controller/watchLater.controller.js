const { topic } = require("../model");
const db = require("../model");
const httpStatus = require("../utils/httpStatus");
const WatchLater = db.watchLater;
const User = db.user;
const watchLaterController = {};

// add a news to watch later
watchLaterController.addNewsToListWatchLater = async (req, res, next) => {
    try{
        let userId = req.userId;
        let user = await User.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).send({
            code: httpStatus.UNAUTHORIZED,
            message: "Unauthorized",
            });
        }
        let laterNews = {
            user_id: userId,
            news_id: req.body.news_id,
            topic: req.body.topic,
            add_time: Date.now()
        }
        let checkNews = await WatchLater.find({
            user_id: userId,
            news_id: req.body.news_id
        });
        if(checkNews.length == 0){
            await WatchLater.insertMany(laterNews);
            let justNewsAdded = await WatchLater.findOne({
                user_id: userId,
                news_id: req.body.news_id
            });
            // console.log("add: ",justNewsAdded);
            if(justNewsAdded == null){
                return res.status(httpStatus.BAD_REQUEST).send({
                    code: httpStatus.BAD_REQUEST,
                    message: "Add this news to watch later failed!"
                });
            }
            return res.status(httpStatus.OK).send({
                code: httpStatus.OK,
                message: "Add this news to watch later successfully!",
                data: justNewsAdded
            });
        }else{
            return res.status(httpStatus.BAD_REQUEST).send({
                code: httpStatus.BAD_REQUEST,
                message: "This news has already added in watch later list news!"
            });
        }
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}

//get List Watch Later Orderby add_time
watchLaterController.getListWatchLaterOrderByTime = async (req, res, next) => {
    try{
        let userId = req.userId;
        let user = await User.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                code: httpStatus.UNAUTHORIZED,
                message: "Unauthorized",
            });
        }
        let listWatchLaterNews = await WatchLater.find({user_id: userId}).sort([['add_time', 1]]);
        if(listWatchLaterNews.length == 0){
            return res.status(httpStatus.NO_CONTENT).send({
                code: httpStatus.NO_CONTENT,
                message: "Watch later is empty!"
            });
        }
        return res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            message: "Get list watch later successfully",
            data: listWatchLaterNews
        });

    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}

//get List Watch Later Orderby add_time and group by Topic
watchLaterController.getListWatchLaterOrderByTimeEveryTopic = async (req, res, next) => {
    try{
        let userId = req.userId;
        let user = await User.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                code: httpStatus.UNAUTHORIZED,
                message: "Unauthorized",
            });
        }
        let topic_news = req.body.topic; 
        let listWatchLaterNews = await WatchLater.find({
            user_id: userId,
            topic: topic_news
        }).sort([['add_time', 1]]);
        if(listWatchLaterNews.length == 0){
            return res.status(httpStatus.NO_CONTENT).send({
                code: httpStatus.NO_CONTENT,
                message: "Watch later of this topic is empty!"
            });
        }
        return res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            message: `Get list watch later of topic ${topic_news}  successfully`,
            data: listWatchLaterNews
        });
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}

//remove a news from watch later
watchLaterController.deleteNewsFromWatchLater = async (req, res, next) => {
    try{
        let userId = req.userId;
        let user = await User.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).send({
                code: httpStatus.UNAUTHORIZED,
                message: "Unauthorized",
            });
        }
        let news_id = req.body.news_id;
        let justDeleteNews = await WatchLater.deleteOne({
            user_id: userId,
            news_id: news_id
        });
        return res.status(httpStatus.OK).send({
            code: httpStatus.OK,
            message: "delete this news from watch later successfully!",
            data: justDeleteNews
        })
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            code: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message
        });
    }
}
module.exports = watchLaterController;