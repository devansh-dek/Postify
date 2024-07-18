import { LikeRepository, TweetRepository } from '../repository/index.js'
import Tweet from '../models/Tweet.js'


class LikeService {
    constructor() {
        this.LikeRepository = new LikeRepository();
        this.TweetRepository = new TweetRepository();
    }
    async toggleLike(modelId, modelType, userId) {
        console.log(modelId, modelType, userId);
        try {
            if (modelType == 'Tweet') {
                var likeabe = await this.TweetRepository.find(modelId);
            }
            else if (modelType == 'Comment') {

            }
            else {
                throw Error("Invalid modeltype for like");
            }

            const exists = await this.LikeRepository.findLikeable({
                user: userId,
                onModel: modelType,
                likeable: modelId
            })
            if (exists) {
                likeable.likes.pull(exists.id);
                await likeable.save();
                await exists.remove();
                var isAdded = false;
            }
            else {
                const newLike = await this.LikeRepository.create({
                    onModel: modelType,
                    likeable: modelId,
                    user: userId
                })
                likeable.likse.push(newLike);
                await likeable.save();
                var isAdded = true;
            }
            return isAdded;
        }
        catch (error) {
            console.log("Error while toggling like");
            throw error;
        }



    }



}

export default LikeService;
