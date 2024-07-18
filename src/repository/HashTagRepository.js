import Hashtag from "../models/hashtags.js";
import CrudRepository from "./CrudRepository.js";
class HashtagRepository extends CrudRepository {


    async bulkCreate(data) {
        try {
            const tags = await Hashtag.insertMany(data);
            return tags
        } catch (error) {
            console.log("error in Hastag Repo layer", error);
        }
    }

    async findByName(titleList) {
        try {
            const tags = await Hashtag.find({
                title: titleList
            })
            return tags;
        }
        catch (error) {
            console.log("error in Hastag Repo layer", error);

        }
    }




}

export default HashtagRepository;