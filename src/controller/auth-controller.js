import { UserService } from "../services/index.js";
import UserRepository from "../repository/UserRepository.js";
const userService = new UserService();

const signup = async (req, res) => {
    try {
        console.log("req is ", req.body);
        console.log("funcis ", userService.create);

        console.log("User service is ", userService);
        const user = await userService.create(req.body);

        return res.status(201).json({
            data: user,
            sucess: true
        })
    }
    catch (error) {
        console.log("Auth controller is errorified ", error);
        // throw error
        return res.status(401).json({
            error: error,
            sucess: false
        })
    }
}

const login = async (req, res) => {
    try {
        const token = await userService.signin(req.body);
        return res.status(401).json({
            msg: "Successfully loged in !",
            data: token,
            err: {}
        });
    }
    catch (error) {
        console.log("Error in login controller ", error);
        return res.status(500).json({
            msg: "Something went wrong",
            data: {},
            success: false
        });

    }
}


export {
    signup,
    login
}