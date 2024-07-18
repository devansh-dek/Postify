import { CommentService } from "../services/index.js";

const commentService = new CommentService();

const createComment = async (req, res) => {
    try {
        console.log("req body is ", req.body.modelId, req.body.modelType, req.body.userId, req.body.content);
        const comment = await commentService.create(req.body.modelId, req.body.modelType, req.body.userId, req.body.content);
        console.log(
            "Comment is ", comment
        )
        return res.status(201).json({
            data: comment,
            success: true
        })

    }
    catch (error) {
        console.log("Error in comment controller ", error);
        return res.status(400).json({
            data: error,
            sucess: false,

        })
    }
}


export {
    createComment
}

