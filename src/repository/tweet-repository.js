import Tweet from '../models/Tweet.js'
import CrudRepository from './CrudRepository.js';

class TweetRepository extends CrudRepository {
    async find(id) {
        try {
            const tweet = await Tweet.findById(id).populate({ path: 'likes' });
            return tweet;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments'
            }).lean();
            return tweet;
        }
        catch (error) {
            throw error
        }
    }
    async create(data) {
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        }
        catch {
            console.log("Error in Tweet repo", error);
        }
    }
    async get(id) {
        try {
            console.log("got in repo");
            const tweet = await Tweet.findById(id);
            console.log("tweet is ", tweet);
            return tweet;
        } catch {
            console.log("Error in Tweet repo", error);

        }
    }
    async destroy(id) {
        try {
            const tweet = await Tweet.findByIdAndRemove(id);
            return tweet;

        }
        catch {
            console.log("Error in Tweet repo", error);

        }
    }

    async getAll(offset, limits) {
        try {
            const tweets = await Tweet.find().skip(offset).limit(limit);
            return tweets;
        }
        catch {
            console.log("Error in Tweet repo", error);

        }
    }


}

export default TweetRepository;