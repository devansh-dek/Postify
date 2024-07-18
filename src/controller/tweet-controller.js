import { TweetService } from "../services/index.js";
const tweetService = new TweetService();
import upload from "../config/fileupload-s3.js";
const singleUploader = upload.single('image');

const createTweet = async (req, res) => {
    try {
        singleUploader(req, res, async function (err) {
            if (err) {
                console.log("Couldnt upload due to ", err);
                return res.status(500).json({
                    error: "Couldn't upload image",
                    message: err,
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    error: "No file uploaded",
                });
            }

            const payloadData = { ...req.body };
            payloadData.image = req.file.location;
            const tweet = await tweetService.create(payloadData);

            return res.status(201).json({
                data: tweet,
                success: true,
            });
        });
    } catch (error) {
        return res.status(401).json({
            error: "Error in controller layer",
            message: error,
        });
    }
};

const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(201).json({
            data: response,
            success: true,
        });
    } catch (error) {
        console.log("Error in tweet controller layer");
        return res.status(404).json({
            data: error,
            success: false,
            message: "Error retrieving tweet",
        });
    }
};

export {
    createTweet,
    getTweet,
};
