import CrudRepository from "./CrudRepository.js";
import Comment from "../models/comment.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment)
    }
    async get(id) {
        try {
            console.log("got in comment repo with id ", id);
            const comment = await Comment.findById(id);
            console.log("comment is ", tweet);
            return comment;
        } catch {
            console.log("Error in comment repo", error);
            throw error
        }
    }
}
export default CommentRepository

