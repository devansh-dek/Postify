import { TweetService } from "../services/index.js";
const tweetService = new TweetService()

const createTweet = async (req, res) => {
    try {
        console.log("the req body is ", req.body);
        const tweet = await tweetService.create(req.body);

        return res.status(201).json({
            size: tweet,
            data: tweet,
            success: true
        })
    }
    catch (error) {
        return res.status(401).json({
            error: "Error in controller layer",
            message: error
        })
    }

}

const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(201).json({
            data: response,
            sucess: true
        })
    }
    catch (error) {
        console.log("Error in tweet controller layer");
        return res.status(404).json({
            data: error,
            sucess: false,
            message: " "
        })
    }
}

export {
    createTweet,
    getTweet
}