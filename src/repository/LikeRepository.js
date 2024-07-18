import CrudRepository from "./CrudRepository.js";
import Like from '../models/likes.js'
class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }
    async findLikeable(data) {
        try {
            const like = await Like.findOne(data);
            return like;
        }
        catch (error) {
            throw error;
        }
    }



}

export default LikeRepository;