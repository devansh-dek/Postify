import { TweetRepository, UserRepository } from "../repository/index.js";

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }
    async create(data) {
        try {
            console.log("Dta is ", data);
            const user = await this.UserRepository.create(data);
            return user;
        }
        catch (error) {
            console.log("error in user service", error);
            throw error;
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.UserRepository.findBy({ email });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async signin(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if (!user) {
                throw {
                    message: 'no user found'
                }
            }
            if (!user.comparePassword(data.password)) {
                throw {
                    message: 'incorrect message'
                }
            }
            const token = user.getJWT();
            return token;
        }
        catch (error) {
            throw error
        }
    }















}
export default UserService;