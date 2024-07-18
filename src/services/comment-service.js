import { CommentRepository, TweetRepository } from "../repository/index.js";
class CommentService {
    constructor() {
        this.CommentRepository = new CommentRepository();
        this.TweetRepository = new TweetRepository();
    }
    async create(modelId, modelType, userId, content) {


        try {
            if (modelType == 'Tweet') {
                console.log("entered type");
                var commentable = await this.TweetRepository.get(modelId);
            }
            else if (modelType == 'Comment') {
                var commentable = await this.CommentRepository.get(modelId);
            }
            else {
                throw new Error("Invalid Model Type");
            }
            console.log("Commetable is ", commentable);
            const comment = await this.CommentRepository.create({
                content: content,
                userId: userId,
                onModel: modelType,
                commentable: modelId,
                comments: []
            });
            commentable.comments.push(comment);
            await commentable.save();
            return comment;

        }
        catch (error) {
            console.log("Error in Comment service", error);
            throw error;
        }

    }



}

export default CommentService