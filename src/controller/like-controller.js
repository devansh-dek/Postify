import { LikeService } from "../services/index.js";

const likeservice = new LikeService();
export const toggleLike = async (req, res) => {
    try {
        const response = await likeservice.toggleLike(req.query.modelId, req.query.modelType, req.body.userId)
        return res.status(201).json({
            data: response,
            sucess: true
        })
    } catch (error) {
        return res.staus(400).json({
            err: error,
            sucess: false
        })
    }
}

