import { TweetRepository, HashtagRepository } from '../repository/index.js'


class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    //here we do two things first we extract hastags from message then we match how many hastags of them were already used and the ones not already used we create them in repo and one already used we just append this tweet to it
    async create(data) {
        try {
            const content = data.content;
            const tags = content.match(/#[a-zA-Z0-9_]+/g)
                .map((tag) => tag.substring(1).toLowerCase()); // this regex extracts hashtags
            const tweet = await this.tweetRepository.create(data);
            console.log("content is ", content);

            console.log(tweet, "is our tweet");
            console.log("tags are ", tags);
            let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
            console.log("already present tags ", alreadyPresentTags);
            let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);
            console.log("title of present tags ", titleOfPresenttags);
            let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
            newTags = newTags.map(tag => {
                return { title: tag, tweets: [tweet.id] }
            });
            await this.hashtagRepository.bulkCreate(newTags);
            alreadyPresentTags.forEach((tag) => {
                tag.tweets.push(tweet.id);
                tag.save();
            });
            return tweet;
        }
        catch (error) {
            console.log("Error in service layer ", error);
            throw error;
        }
    }
    async get(tweetId) {
        try {
            const tweets = await this.tweetRepository.getWithComments(tweetId);
            return tweets;
        }
        catch (error) {
            console.log("Error in service layer of tweet");
            throw error;
        }
    }


}

export default TweetService;