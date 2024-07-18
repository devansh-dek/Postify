import Tweet from "../models/Tweet.js";


class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data)
            return result
        } catch (error) {
            console.log("Something error in crud repository");
            throw error
        }
    }

    async destroy(id) {
        try {
            const result = await this.model.destroy(id);
            return result
        } catch (error) {
            console.log("Something error in crud repository");

            throw error
        }
    }
    async getAll() {
        try {
            const result = await this.model.find({});
            return result;

        }
        catch (error) {
            console.log("Something error in crud repository");

            throw error;
        }
    }
    async update(id, data) {
        try {
            // new used to return newl updated object otherwise sould have return old one only
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        }
        catch (error) {
            console.log("Something error in crud repository");
            throw error;

        }
    }




}

export default CrudRepository